import { createFeatureSelector } from "@ngrx/store";
import { productsFeatureKey } from "../feature-key";
import { ProductsFeatureState } from "../reducers";

export const getProductsFeature = createFeatureSelector<ProductsFeatureState>(productsFeatureKey);