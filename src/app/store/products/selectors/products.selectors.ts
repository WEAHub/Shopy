import { createSelector } from '@ngrx/store';
import { getProductsFeature } from './get-feature-state';

export const isLoading = createSelector(
  getProductsFeature,
  state => state.loading!
);

export const getProducts = createSelector(
  getProductsFeature,
  state => state.entity! || []
);

export const getError = createSelector(
  getProductsFeature,
  state => state.error!
);

export const getProductById = (id: number) =>
  createSelector(getProductsFeature, state =>
    state.entity?.find(p => p.id === id)
  );

export const getProductByCategory = (category: string) =>
  createSelector(
    getProductsFeature,
    state => state.entity?.filter(p => p.category === category) || []
  );
