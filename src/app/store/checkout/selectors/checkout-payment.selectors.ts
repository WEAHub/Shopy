import { createSelector } from '@ngrx/store';
import { getCheckoutFeature } from './get-feature-state';

const getPaymentFeatureStore = createSelector(
  getCheckoutFeature,
  state => state.payment
);

export const isLoading = createSelector(
  getPaymentFeatureStore,
  state => state.loading!
);

export const getInvoice = createSelector(
  getPaymentFeatureStore,
  state => state.entity!
);

export const getError = createSelector(
  getPaymentFeatureStore,
  state => state.error!
);
