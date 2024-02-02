import { createReducer, on } from '@ngrx/store';
import { EntityDataState } from '@shared/interfaces/store/common/EntityDataState';
import {
  onCartInit,
  onCartSuccess,
  onCartError,
  onCartUpdateSuccess,
  onCartUpdate,
  onCartUpdateError,
} from '../actions/cart.actions';
import { Cart } from '@shared/interfaces/carts/Cart';

export const initialCartState: EntityDataState<Cart> = {
  loading: false,
  entity: undefined,
  error: undefined,
};

export const cartReducer = createReducer<EntityDataState<Cart>>(
  { ...initialCartState },
  // INIT
  on(onCartInit, state => {
    return {
      ...state,
      loading: true,
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
  }),
  // UPDATE
  on(onCartUpdate, state => {
    return {
      ...state,
      loading: true,
      error: undefined,
    };
  }),
  on(onCartUpdateSuccess, (state, action) => {
    return {
      ...state,
      loading: false,
      entity: action.cart,
    };
  }),
  on(onCartUpdateError, (state, action) => {
    return {
      ...state,
      entity: undefined,
      loading: false,
      error: action.error,
    };
  })
);
