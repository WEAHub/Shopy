import { createSelector } from '@ngrx/store';
import { getCheckoutFeature } from './get-feature-state';

export const isLoading = createSelector(
  getCheckoutFeature,
  state => state.loading!
);

export const getInvoice = createSelector(
  getCheckoutFeature,
  state => state.entity!
);

export const getError = createSelector(
  getCheckoutFeature,
  state => state.error!
);
