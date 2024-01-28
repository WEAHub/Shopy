import { createSelector } from "@ngrx/store";
import { getCategoriesFeature } from "./get-feature-state";

export const isLoading = createSelector(
  getCategoriesFeature,
  state => state.loading!
)

export const getCategories = createSelector(
  getCategoriesFeature,
  state => state.entity!
)

export const getError = createSelector(
  getCategoriesFeature,
  state => state.error
)