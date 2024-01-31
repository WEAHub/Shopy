import { createReducer, on } from '@ngrx/store';
import { EntityDataState } from '@shared/interfaces/store/common/EntityDataState';
import { Products } from '@shared/interfaces/products/Product';
import {
  onGetProducts,
  onGetProductsError,
  onInitProducts,
} from '../actions/products.actions';

export const initialCategoryState: EntityDataState<Products> = {
  entity: [],
};

export const categoryReducer = createReducer<EntityDataState<Products>>(
  { ...initialCategoryState },
  on(onInitProducts, state => {
    return {
      ...state,
      loading: false,
      entity: [],
      error: null,
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
