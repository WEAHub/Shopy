import { cartMock, errorMock } from '@shared/mocks/tests';
import {
  onCartInit,
  onCartSuccess,
  onCartError,
  onCartUpdate,
  onCartUpdateSuccess,
  onCartUpdateError,
} from '../actions/cart.actions';
import { cartReducer, initialCartState } from './cart.reducer';

describe('Cart Reducer', () => {
  it('should have initial state with loading = true', () => {
    const expected = {
      loading: true,
      entity: undefined,
      error: undefined,
    };
    const action = onCartInit;
    expect(cartReducer(initialCartState, action)).toEqual(expected);
  });

  it('should update store with cart', () => {
    const expected = {
      loading: false,
      entity: cartMock,
      error: undefined,
    };
    const action = onCartSuccess({ cart: cartMock });
    expect(cartReducer(initialCartState, action)).toEqual(expected);
  });

  it('should update store with error and cart undefined', () => {
    const expected = {
      loading: false,
      entity: undefined,
      error: errorMock,
    };
    const action = onCartError({ error: errorMock });
    expect(cartReducer(initialCartState, action)).toEqual(expected);
  });

  it('should init onCartUpdate with undefined cart', () => {
    const expected = {
      loading: true,
      entity: undefined,
      error: undefined,
    };
    const action = onCartUpdate;
    expect(cartReducer(initialCartState, action)).toEqual(expected);
  });
  it('should init onCartUpdateSuccess and update the store', () => {
    const expected = {
      loading: false,
      entity: cartMock,
      error: undefined,
    };
    const action = onCartUpdateSuccess({ cart: cartMock });
    expect(cartReducer(initialCartState, action)).toEqual(expected);
  });

  it('should init onCartUpdateError and update the store with an error', () => {
    const expected = {
      loading: false,
      entity: undefined,
      error: errorMock,
    };
    const action = onCartUpdateError({ error: errorMock });
    expect(cartReducer(initialCartState, action)).toEqual(expected);
  });
});
