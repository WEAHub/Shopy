import { createFeatureSelector } from "@ngrx/store";
import { categoriesFeatureKey } from "../feature-key";
import { CategoriesFeatureState } from "../reducers";

export const getCategoriesFeature = createFeatureSelector<CategoriesFeatureState>(categoriesFeatureKey);