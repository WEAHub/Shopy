// Reducers
import * as fromProducts from './products.reducer';
import * as fromProductsFeatured from './products-featured.reducer';
import * as fromProductView from './product-view.reducer';
import { combineReducers } from '@ngrx/store';

export interface ProductsFeatureState {
  products: fromProducts.ProductsDataState;
  productsFeatured: fromProductsFeatured.ProductsFeaturedDataState;
  productView: fromProductView.ProductsViewDataState;
}

export const productsFeatureReducer = combineReducers<ProductsFeatureState>({
  products: fromProducts.productReducer,
  productsFeatured: fromProductsFeatured.productFeaturedReducer,
  productView: fromProductView.productViewReducer,
});
