import { createFeatureSelector } from '@ngrx/store';
import { authFeatureKey } from '../feature-key';
import { AuthFeatureState } from '../reducers';

export const getAuthFeature =
  createFeatureSelector<AuthFeatureState>(authFeatureKey);
