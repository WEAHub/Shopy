import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CartsService } from '@shared/services/carts/carts.service';
import {
  catchError,
  exhaustMap,
  lastValueFrom,
  map,
  mergeMap,
  of,
  switchMap,
} from 'rxjs';
import {
  onCartError,
  onCartInit,
  onCartSuccess,
  onCartUpdate,
  onCartUpdateError,
  onCartUpdateSuccess,
} from '../actions/cart.actions';
import { CartProduct } from '@shared/interfaces/carts/Cart';
import { ProductsService } from '@shared/services/products/products.service';

@Injectable()
export class CartEffects {
  constructor(
    private actions$: Actions,
    private cartService: CartsService,
    private productsService: ProductsService
  ) {}

  async aggregateProduct(products: CartProduct[]): Promise<CartProduct[]> {
    return await Promise.all(
      products.map(async p => ({
        ...p,
        product: await lastValueFrom(
          this.productsService.getProduct(p.productId)
        ),
      }))
    );
  }

  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(onCartInit),
      switchMap(() =>
        this.cartService.getCart().pipe(
          // Merge map nos permite utilizar una funcion async
          /*    mergeMap(async cart => {
            const products = await this.aggregateProduct(cart.products);
            return { ...cart, products };
          }), */
          map(cart => onCartSuccess({ cart })),
          catchError(error => of(onCartError({ error })))
        )
      )
    )
  );

  update$ = createEffect(() =>
    this.actions$.pipe(
      ofType(onCartUpdate),
      exhaustMap(({ cart }) =>
        this.cartService.updateCart(cart).pipe(
          mergeMap(async cart => {
            const products = await this.aggregateProduct(cart.products);
            return { ...cart, products };
          }),
          map(cart => onCartUpdateSuccess({ cart })),
          catchError(error => of(onCartUpdateError({ error })))
        )
      )
    )
  );
}
