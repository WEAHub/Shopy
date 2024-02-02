import { createReducer, on } from '@ngrx/store';
import { EntityDataState } from '@shared/interfaces/store/common/EntityDataState';
import { Product } from '@shared/interfaces/products/Product';
import {
  onGetProductsView,
  onGetProductsViewError,
  onInitProductsView,
} from '../actions/products-view.actions';

export type ProductsViewDataState = EntityDataState<Product>;

export const initialCategoryState: ProductsViewDataState = {
  loading: false,
  entity: undefined,
  error: undefined,
};

export const productViewReducer = createReducer<ProductsViewDataState>(
  { ...initialCategoryState },
  on(onInitProductsView, state => {
    return {
      ...state,
      loading: true,
      entity: undefined,
      error: undefined,
    };
  }),
  on(onGetProductsView, (state, action) => {
    return {
      ...state,
      loading: false,
      entity: action.product,
    };
  }),
  on(onGetProductsViewError, (state, action) => {
    return {
      ...state,
      entity: undefined,
      loading: false,
      error: action.error,
    };
  })
);
