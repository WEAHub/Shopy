import { createSelector } from '@ngrx/store';
import { getCartFeature } from './get-feature-state';

export const isLoading = createSelector(
  getCartFeature,
  state => state.loading!
);

export const getCart = createSelector(
  getCartFeature,
  state => state.entity!
);
export const getError = createSelector(
  getCartFeature,
  state => state.error
);

export const getCartProductsCount = createSelector(
  getCartFeature,
  state => (state.entity !== undefined ? state.entity.products.length : 0)
);

export const getCartProducts = createSelector(getCartFeature, state =>
  state.entity !== undefined ? state.entity.products : []
);

export const getCartTotalPrice = createSelector(
  getCartFeature,
  state =>
    state.entity?.products.reduce(
      (p, n) => p + n.quantity * (n.product?.modifiers?.finalPrice || 0),
      0
    ) || 0
);
