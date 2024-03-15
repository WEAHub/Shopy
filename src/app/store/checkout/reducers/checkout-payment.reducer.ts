import { createReducer, on } from '@ngrx/store';
import { EntityDataState } from '@shared/interfaces/store/common/EntityDataState';
import { Invoice } from '@/shared/interfaces/checkout/Invoice';
import {
  onPayInvoice,
  onPayInvoiceSuccess,
  onPayInvoiceError,
} from '../actions/checkout-payment.actions';

export type CheckoutPaymentDataState = EntityDataState<Invoice>;
export const initialCategoryState: CheckoutPaymentDataState = {};

export const checkoutPaymentReducer =
  createReducer<CheckoutPaymentDataState>(
    { ...initialCategoryState },
    on(onPayInvoice, state => {
      return {
        ...state,
        loading: true,
        entity: undefined,
        error: undefined,
      };
    }),
    on(onPayInvoiceSuccess, (state, action) => {
      return {
        ...state,
        loading: false,
        entity: action.invoice,
        error: undefined,
      };
    }),
    on(onPayInvoiceError, (state, action) => {
      return {
        ...state,
        loading: false,
        entity: undefined,
        error: action.error,
      };
    })
  );
