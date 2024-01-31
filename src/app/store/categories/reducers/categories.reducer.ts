import { createReducer, on } from '@ngrx/store';
import { EntityDataState } from '@shared/interfaces/store/common/EntityDataState';
import { Categories } from '@shared/interfaces/categories/Category';
import {
  onGetCategories,
  onGetCategoriesError,
  onInitCategories,
} from '../actions/categories.actions';

export const initialCategoryState: EntityDataState<Categories> = {};

export const categoryReducer = createReducer<EntityDataState<Categories>>(
  { ...initialCategoryState },
  on(onInitCategories, state => {
    return {
      ...state,
      loading: false,
      entity: undefined,
      error: null,
    };
  }),
  on(onGetCategories, (state, action) => {
    return {
      ...state,
      loading: false,
      entity: action.categories,
    };
  }),
  on(onGetCategoriesError, (state, action) => {
    return {
      ...state,
      entity: undefined,
      loading: false,
      error: action.error,
    };
  })
);
