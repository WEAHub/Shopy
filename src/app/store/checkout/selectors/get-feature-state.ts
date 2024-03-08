import { createFeatureSelector } from '@ngrx/store';
import { checkoutFeatureKey } from '../feature-key';
import { CheckoutFeatureState } from '../reducers';

export const getCheckoutFeature =
  createFeatureSelector<CheckoutFeatureState>(checkoutFeatureKey);
