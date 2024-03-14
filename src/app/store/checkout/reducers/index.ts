import * as fromCheckout from './checkout.reducer';
import * as fromCheckoutDelivery from './checkout-delivery.reducer';
import { combineReducers } from '@ngrx/store';

export interface CheckoutFeatureState {
  invoice: fromCheckout.CheckoutDataState;
  delivery: fromCheckoutDelivery.CheckoutDeliveryDataState;
}

export const checkoutFeatureReducer =
  combineReducers<CheckoutFeatureState>({
    invoice: fromCheckout.checkoutReducer,
    delivery: fromCheckoutDelivery.checkoutDeliveryReducer,
  });
