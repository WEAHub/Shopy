import { Injectable } from '@angular/core';
import { Actions, OnInitEffects, createEffect, ofType } from '@ngrx/effects';
import { CartsService } from '@shared/services/carts/carts.service';
import { Action } from '@ngrx/store';
import { catchError, map, of, switchMap } from 'rxjs';
import {
  onCartError,
  onCartInit,
  onCartSuccess,
} from '../actions/cart.actions';

@Injectable()
export class CartEffects implements OnInitEffects {
  constructor(
    private actions$: Actions,
    private cartService: CartsService
  ) {}

  ngrxOnInitEffects(): Action {
    return onCartInit();
  }

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
}
