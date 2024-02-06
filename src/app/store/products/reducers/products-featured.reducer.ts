import { createReducer, on } from '@ngrx/store';
import { EntityDataState } from '@shared/interfaces/store/common/EntityDataState';
import { Products } from '@shared/interfaces/products/Product';
import {
  onGetProductsFeatured,
  onGetProductsFeaturedError,
  onInitProductsFeatured,
} from '../actions/products-featured.actions';

export type ProductsFeaturedDataState = EntityDataState<Products>;

export const initialCategoryState: ProductsFeaturedDataState = {
  loading: false,
  entity: [],
  error: undefined,
};

export const productFeaturedReducer =
  createReducer<ProductsFeaturedDataState>(
    { ...initialCategoryState },
    on(onInitProductsFeatured, state => {
      return {
        ...state,
        loading: true,
        entity: [],
        error: undefined,
      };
    }),
    on(onGetProductsFeatured, (state, action) => {
      return {
        ...state,
        loading: false,
        entity: action.products,
      };
    }),
    on(onGetProductsFeaturedError, (state, action) => {
      return {
        ...state,
        entity: [],
        loading: false,
        error: action.error,
      };
    })
  );
