import { createReducer, on } from '@ngrx/store';
import { EntityDataState } from '@shared/interfaces/store/common/EntityDataState';
import { onSetCheckoutDelivery } from '../actions/checkout-delivery.actions';
import { Delivery } from '@/shared/interfaces/checkout/Delivery';

export type CheckoutDeliveryDataState = EntityDataState<Delivery>;
export const initialCategoryState: CheckoutDeliveryDataState = {};

export const checkoutDeliveryReducer =
  createReducer<CheckoutDeliveryDataState>(
    { ...initialCategoryState },
    on(onSetCheckoutDelivery, (state, action) => {
      return {
        ...state,
        loading: false,
        entity: action.delivery,
      };
    })
  );
