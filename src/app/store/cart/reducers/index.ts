// Reducers
import { EntityDataState } from '@shared/interfaces/store/common/EntityDataState';
import { User } from '@shared/interfaces/user/User';
import * as fromCart from './cart.reducer';
export type CartFeatureState = EntityDataState<User>;
export const cartFeatureReducer = fromCart.cartReducer;
