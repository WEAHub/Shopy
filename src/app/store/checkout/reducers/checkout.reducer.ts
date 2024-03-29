import { createReducer, on } from '@ngrx/store';
import { EntityDataState } from '@shared/interfaces/store/common/EntityDataState';

import { Invoice } from '@/shared/interfaces/checkout/Invoice';
import {
  onInitCheckout,
  onGetCheckoutSuccess,
  onGetCheckoutError,
} from '../actions/checkout.actions';

export type CheckoutDataState = EntityDataState<Invoice>;
export const initialCategoryState: CheckoutDataState = {};

export const checkoutReducer = createReducer<CheckoutDataState>(
  { ...initialCategoryState },
  on(onInitCheckout, state => {
    return {
      ...state,
      loading: true,
      entity: undefined,
      error: undefined,
    };
  }),
  on(onGetCheckoutSuccess, (state, action) => {
    return {
      ...state,
      loading: false,
      entity: action.invoice,
    };
  }),
  on(onGetCheckoutError, (state, action) => {
    return {
      ...state,
      entity: undefined,
      loading: false,
      error: action.error,
    };
  })
);
