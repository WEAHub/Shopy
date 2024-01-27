import { createSelector } from "@ngrx/store";
import { getAuthFeature } from "./get-feature-state";

export const isAuthenticated = createSelector(
  getAuthFeature,
  state => state.entity !== undefined
);

export const isLoading = createSelector(
  getAuthFeature,
  state => state.loading
)

export const getUser = createSelector(
  getAuthFeature,
  state => state.entity
)

export const getToken = createSelector(
  getAuthFeature,
  state => state.entity?.token
)