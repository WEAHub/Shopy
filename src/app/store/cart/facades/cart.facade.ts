import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { CartResponse } from '@shared/interfaces/backend/cart/CartResponse';
import { Observable, map, take } from 'rxjs';
import {
  getCart,
  getCartProducts,
  getCartProductsCount,
  getCartTotalPrice,
  isLoading,
} from '../selectors/cart.selectors';
import { Cart, CartProduct } from '@shared/interfaces/carts/Cart';
import { onCartInit, onCartUpdate } from '../actions/cart.actions';

@Injectable()
export class CartFacade {
  constructor(private store: Store) {}

  public isLoading$(): Observable<boolean> {
    return this.store.select(isLoading);
  }

  public getCart$(): Observable<CartResponse> {
    return this.store.select(getCart);
  }

  public getCartProductsCount$(): Observable<number> {
    return this.store.select(getCartProductsCount);
  }

  public getCartProducts$(): Observable<CartProduct[]> {
    return this.store.select(getCartProducts);
  }

  public getCartTotalPrice$(): Observable<number> {
    return this.store.select(getCartTotalPrice);
  }

  public updateCart(cart: Cart): void {
    this.store.dispatch(onCartUpdate({ cart }));
  }

  public refreshCart(): void {
    this.store.dispatch(onCartInit());
  }

  public deleteProduct(product: CartProduct): void {
    this.getCart$()
      .pipe(
        take(1),
        map(cart => {
          const _cart = this.deleteProductProcess(cart, product);
          if (_cart) {
            this.updateCart(_cart);
          }
        })
      )
      .subscribe();
  }

  public updateProduct(product: CartProduct): void {
    this.getCart$()
      .pipe(
        take(1),
        map(cart => {
          const _cart = this.updateProductProcess(cart, product);
          if (_cart) {
            this.updateCart(_cart);
          }
        })
      )
      .subscribe();
  }

  public addProduct(product: CartProduct): void {
    this.getCart$()
      .pipe(
        take(1),
        map(cart => {
          const _cart = this.addProductProcess(cart, product);
          this.updateCart(_cart);
        })
      )
      .subscribe();
  }

  private addProductProcess(cart: Cart, product: CartProduct): Cart {
    const products = [...cart.products];

    const productIdx = products.findIndex(
      p => p.productId === product.productId
    );

    if (productIdx === -1) {
      products.push(product);
    } else {
      const { quantity, ..._product } = products[productIdx];
      products[productIdx] = {
        ..._product,
        quantity: quantity + product.quantity,
      };
    }

    return {
      ...cart,
      products,
    };
  }

  private updateProductProcess(
    cart: Cart,
    product: CartProduct
  ): Cart | undefined {
    const productId = cart.products.findIndex(
      p => p.productId === product.productId
    );

    if (productId === -1) return;

    const products = [...cart.products];
    products[productId] = { ...product };

    return {
      ...cart,
      products,
    };
  }

  private deleteProductProcess(
    cart: Cart,
    product: CartProduct
  ): Cart | undefined {
    const productId = cart.products.findIndex(
      p => p.productId === product.productId
    );

    if (productId === -1) return;

    const products = [...cart.products];
    products.splice(productId, 1);

    return {
      ...cart,
      products,
    };
  }
}
