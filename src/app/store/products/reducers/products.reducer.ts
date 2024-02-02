import { createReducer, on } from '@ngrx/store';
import { EntityDataState } from '@shared/interfaces/store/common/EntityDataState';
import { Products } from '@shared/interfaces/products/Product';
import {
  onGetProducts,
  onGetProductsError,
  onInitProducts,
  onInitProductsByCategory,
} from '../actions/products.actions';

export type ProductsDataState = EntityDataState<Products>;

export const initialCategoryState: ProductsDataState = {
  loading: false,
  entity: [],
  error: undefined,
};

export const productReducer = createReducer<ProductsDataState>(
  { ...initialCategoryState },
  on(onInitProductsByCategory, state => {
    return {
      ...state,
      loading: true,
      entity: [],
      error: undefined,
    };
  }),
  on(onInitProducts, state => {
    return {
      ...state,
      loading: true,
      entity: [],
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
      entity: [],
      loading: false,
      error: action.error,
    };
  })
);
