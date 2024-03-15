import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import {
  isLoading,
  getError,
  getInvoice,
} from '../selectors/checkout-payment.selectors';
import { Invoice } from '@/shared/interfaces/checkout/Invoice';
import { InvoicePayment } from '@/shared/interfaces/backend/checkout/CheckoutRequest';
import { onPayInvoice } from '../actions/checkout-payment.actions';

@Injectable()
export class CheckoutPaymentFacade {
  constructor(private store: Store) {}

  public isLoading$(): Observable<boolean> {
    return this.store.select(isLoading);
  }

  public getInvoice$(): Observable<Invoice> {
    return this.store.select(getInvoice);
  }

  public getError$(): Observable<HttpErrorResponse> {
    return this.store.select(getError);
  }

  public initPayment(invoice: InvoicePayment): void {
    this.store.dispatch(onPayInvoice({ invoice }));
  }
}
