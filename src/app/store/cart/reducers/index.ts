// Reducers
import { EntityDataState } from '@shared/interfaces/store/common/EntityDataState';
import { Cart } from '@shared/interfaces/carts/Cart';
import * as fromCart from './cart.reducer';
export type CartFeatureState = EntityDataState<Cart>;
export const cartFeatureReducer = fromCart.cartReducer;
