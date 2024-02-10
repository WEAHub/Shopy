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
import { onCartUpdate } from '../actions/cart.actions';

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
    return this.store.dispatch(onCartUpdate({ cart }));
  }

  public deleteProduct(product: CartProduct): void {
    this.getCart$()
      .pipe(
        take(1),
        map(cart => {
          const productId = cart.products.findIndex(
            p => p.productId === product.productId
          );

          if (productId === -1) return;

          const products = [...cart.products];
          products.splice(productId, 1);

          cart = {
            ...cart,
            products,
          };

          this.updateCart(cart);
        })
      )
      .subscribe();
  }

  public updateProduct(product: CartProduct): void {
    this.getCart$()
      .pipe(
        take(1),
        map(cart => {
          const productId = cart.products.findIndex(
            p => p.productId === product.productId
          );

          if (productId === -1) return;

          const products = [...cart.products];
          products[productId] = { ...product };

          this.updateCart({
            ...cart,
            products,
          });
        })
      )
      .subscribe();
  }

  public addProduct(product: CartProduct): void {
    this.getCart$()
      .pipe(
        take(1),
        map(cart => {
          const products = [...cart.products];

          const productIdx = products.findIndex(
            p => p.productId === product.productId
          );

          if (productIdx === -1) {
            products.push(product);
          } else {
            products[productIdx].quantity += product.quantity;
          }

          this.updateCart({
            ...cart,
            products,
          });
        })
      )
      .subscribe();
  }
}
