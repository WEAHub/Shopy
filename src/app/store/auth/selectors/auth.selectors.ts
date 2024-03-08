/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import { createSelector } from '@ngrx/store';
import { getAuthFeature } from './get-feature-state';

export const isAuthenticated = createSelector(
  getAuthFeature,
  state => !!state.entity
);

export const isLoading = createSelector(
  getAuthFeature,
  state => state.loading!
);

export const getUser = createSelector(
  getAuthFeature,
  state => state.entity!
);

export const getToken = createSelector(getAuthFeature, state => ({
  accessToken: state.entity?.accessToken!,
  refreshToken: state.entity?.refreshToken!,
}));

export const isRefreshing = createSelector(
  getAuthFeature,
  state => !!state.refreshing
);

export const getError = createSelector(
  getAuthFeature,
  state => state.error!
);
