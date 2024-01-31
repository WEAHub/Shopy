// Reducers
import { EntityDataState } from '@shared/interfaces/store/common/EntityDataState';
import * as fromProducts from './products.reducer';
import { Products } from '@shared/interfaces/products/Product';
export type ProductsFeatureState = EntityDataState<Products>;
export const productsFeatureReducer = fromProducts.categoryReducer;
