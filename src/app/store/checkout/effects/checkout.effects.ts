import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  onGetCheckoutError,
  onGetCheckoutSuccess,
  onInitCheckout,
} from '../actions/checkout.actions';
import { switchMap, map, catchError, of } from 'rxjs';

import { CheckoutService } from '@/shared/services/checkout/checkout.service';

@Injectable()
export class CheckoutEffects {
  constructor(
    private actions$: Actions,
    private checkoutService: CheckoutService
  ) {}

  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(onInitCheckout),
      switchMap(() =>
        this.checkoutService.getCheckout().pipe(
          map(invoice => onGetCheckoutSuccess({ invoice })),
          catchError(error => of(onGetCheckoutError({ error })))
        )
      )
    )
  );
}
