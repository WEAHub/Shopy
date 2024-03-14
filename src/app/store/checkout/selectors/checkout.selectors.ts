import { createSelector } from '@ngrx/store';
import { getCheckoutFeature } from './get-feature-state';

const getCheckoutFeatureStore = createSelector(
  getCheckoutFeature,
  state => state.invoice
);

export const isLoading = createSelector(
  getCheckoutFeatureStore,
  state => state.loading!
);

export const getInvoice = createSelector(
  getCheckoutFeatureStore,
  state => state.entity!
);

export const getError = createSelector(
  getCheckoutFeatureStore,
  state => state.error!
);
