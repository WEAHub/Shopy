import { createReducer, on } from '@ngrx/store';
import { EntityDataState } from '@shared/interfaces/store/common/EntityDataState';
import {
  onCartInit,
  onCartSuccess,
  onCartError,
} from '../actions/cart.actions';
import { Cart } from '@shared/interfaces/carts/Cart';

export const initialCartState: EntityDataState<Cart> = {};

export const cartReducer = createReducer<EntityDataState<Cart>>(
  { ...initialCartState },
  on(onCartInit, state => {
    return {
      ...state,
      loading: false,
      entity: undefined,
      error: undefined,
    };
  }),
  on(onCartSuccess, (state, action) => {
    return {
      ...state,
      loading: false,
      entity: action.cart,
    };
  }),
  on(onCartError, (state, action) => {
    return {
      ...state,
      entity: undefined,
      loading: false,
      error: action.error,
    };
  })
);
