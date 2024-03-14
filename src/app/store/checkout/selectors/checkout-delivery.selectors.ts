import { createSelector } from '@ngrx/store';
import { getCheckoutFeature } from './get-feature-state';

const getCheckoutDeliveryFeatureStore = createSelector(
  getCheckoutFeature,
  state => state.delivery
);

export const getDelivery = createSelector(
  getCheckoutDeliveryFeatureStore,
  state => state.entity!
);
