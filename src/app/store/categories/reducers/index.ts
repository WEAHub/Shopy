// Reducers
import { EntityDataState } from '@shared/interfaces/store/common/EntityDataState';
import * as fromCategories from './categories.reducer';
import { Categories } from '@shared/interfaces/categories/Category';
export type CategoriesFeatureState = EntityDataState<Categories>;
export const categoriesFeatureReducer = fromCategories.categoryReducer;
