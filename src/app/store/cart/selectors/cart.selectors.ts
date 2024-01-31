import { createSelector } from "@ngrx/store";
import { getCartFeature } from "./get-feature-state";

export const isCartenticated = createSelector(
  getCartFeature,
  state => state.entity !== undefined
);

export const isLoading = createSelector(
  getCartFeature,
  state => state.loading!
)

export const getUser = createSelector(
  getCartFeature,
  state => state.entity!
)

export const getToken = createSelector(
  getCartFeature,
  state => state.entity?.token
)

export const getError = createSelector(
  getCartFeature,
  state => state.error
)