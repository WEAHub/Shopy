import { CheckoutService } from '@/shared/services/checkout/checkout.service';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { switchMap, map, catchError, of } from 'rxjs';
import {
  onPayInvoice,
  onPayInvoiceSuccess,
  onPayInvoiceError,
} from '../actions/checkout-payment.actions';
import { parseMessage } from '@/shared/rx-pipes/backend-parse';
import { MessageService } from 'primeng/api';
import { Invoice } from '@/shared/interfaces/checkout/Invoice';
import { onCartInit } from '../../cart/actions/cart.actions';

@Injectable()
export class CheckoutPaymentEffects {
  constructor(
    private actions$: Actions,
    private checkoutService: CheckoutService,
    private msgService: MessageService
  ) {}

  initPayment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(onPayInvoice),
      switchMap(({ invoice }) =>
        this.checkoutService.payInvoice(invoice).pipe(
          parseMessage<Invoice>(this.msgService, 'Payment'),
          switchMap(invoice =>
            of(onPayInvoiceSuccess({ invoice }), onCartInit())
          ),
          catchError(error => of(onPayInvoiceError({ error })))
        )
      )
    )
  );
}
