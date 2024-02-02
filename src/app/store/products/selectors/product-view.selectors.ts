import { createSelector } from '@ngrx/store';
import { getProductsFeature } from './get-feature-state';

const getProductsViewStore = createSelector(
  getProductsFeature,
  state => state.productView
);

export const isLoading = createSelector(
  getProductsViewStore,
  state => state.loading!
);

export const getProduct = createSelector(
  getProductsViewStore,
  state => state.entity!
);

export const getError = createSelector(
  getProductsViewStore,
  state => state.error!
);
