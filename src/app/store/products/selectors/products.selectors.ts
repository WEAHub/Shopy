import { createSelector } from '@ngrx/store';
import { getProductsFeature } from './get-feature-state';

const getProductsStore = createSelector(
  getProductsFeature,
  state => state.products
);

export const isLoading = createSelector(
  getProductsStore,
  state => state.loading!
);

export const getProducts = createSelector(
  getProductsStore,
  state => state.entity! || []
);

export const getError = createSelector(getProductsStore, state => state.error!);

export const getProductById = (id: number) =>
  createSelector(getProductsStore, state =>
    state.entity?.find(p => p.id === id)
  );

export const getProductByCategory = (category: string) =>
  createSelector(
    getProductsStore,
    state => state.entity?.filter(p => p.category === category) || []
  );
