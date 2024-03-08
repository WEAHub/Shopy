// Reducers
import { EntityDataState } from '@shared/interfaces/store/common/EntityDataState';
import * as fromCheckout from './checkout.reducer';
import { Invoice } from '@/shared/interfaces/checkout/Invoice';
export type CheckoutFeatureState = EntityDataState<Invoice>;
export const checkoutFeatureReducer = fromCheckout.checkoutReducer;
