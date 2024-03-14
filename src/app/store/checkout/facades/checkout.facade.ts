import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

// Interfaces

// Actions

// Selectors
import { HttpErrorResponse } from '@angular/common/http';
import {
  isLoading,
  getError,
  getInvoice,
} from '../selectors/checkout.selectors';
import { Invoice } from '@/shared/interfaces/checkout/Invoice';
import { onInitCheckout } from '../actions/checkout.actions';

@Injectable()
export class CheckoutFacade {
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

  public initInvoice(): void {
    this.store.dispatch(onInitCheckout());
  }
}
