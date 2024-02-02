import { createSelector } from '@ngrx/store';
import { getProductsFeature } from './get-feature-state';

const getProductsFeaturedStore = createSelector(
  getProductsFeature,
  state => state.productsFeatured
);

export const isLoading = createSelector(
  getProductsFeaturedStore,
  state => state.loading!
);

export const getProducts = createSelector(
  getProductsFeaturedStore,
  state => state.entity! || []
);

export const getError = createSelector(
  getProductsFeaturedStore,
  state => state.error!
);
