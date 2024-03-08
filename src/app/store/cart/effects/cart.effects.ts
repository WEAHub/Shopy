import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CartsService } from '@shared/services/carts/carts.service';
import { catchError, exhaustMap, map, of, switchMap } from 'rxjs';
import {
  onCartError,
  onCartInit,
  onCartSuccess,
  onCartUpdate,
  onCartUpdateError,
  onCartUpdateSuccess,
} from '../actions/cart.actions';
import { ProductsService } from '@shared/services/products/products.service';

@Injectable()
export class CartEffects {
  constructor(
    private actions$: Actions,
    private cartService: CartsService,
    private productsService: ProductsService
  ) {}

  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(onCartInit),
      switchMap(() =>
        this.cartService.getCart().pipe(
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
          map(cart => onCartUpdateSuccess({ cart })),
          catchError(error => of(onCartUpdateError({ error })))
        )
      )
    )
  );
}
