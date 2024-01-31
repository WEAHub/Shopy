import { createFeatureSelector } from "@ngrx/store";
import { cartFeatureKey } from "../feature-key";
import { CartFeatureState } from "../reducers";

export const getCartFeature = createFeatureSelector<CartFeatureState>(cartFeatureKey);