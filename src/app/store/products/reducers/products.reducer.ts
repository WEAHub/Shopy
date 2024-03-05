import { createReducer, on } from '@ngrx/store';
import { EntityDataState } from '@shared/interfaces/store/common/EntityDataState';
import { Product } from '@shared/interfaces/products/Product';

import {
  onGetProducts,
  onGetProductsError,
  onInitProducts,
  onInitProductsByCategory,
} from '../actions/products.actions';
import { Paginated } from '@shared/interfaces/products/Paginated';

export type ProductsDataState = EntityDataState<Paginated<Product>>;

export const initialCategoryState: ProductsDataState = {
  loading: false,
  entity: undefined,
  error: undefined,
};

export const productReducer = createReducer<ProductsDataState>(
  { ...initialCategoryState },
  on(onInitProductsByCategory, state => {
    return {
      ...state,
      loading: true,
      error: undefined,
    };
  }),
  on(onInitProducts, state => {
    return {
      ...state,
      loading: true,
      entity: undefined,
      error: undefined,
    };
  }),
  on(onGetProducts, (state, action) => {
    return {
      ...state,
      loading: false,
      entity: action.products,
    };
  }),
  on(onGetProductsError, (state, action) => {
    return {
      ...state,
      entity: undefined,
      loading: false,
      error: action.error,
    };
  })
);
