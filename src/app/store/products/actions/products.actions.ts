import { createAction, props } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';
import { Product } from '@shared/interfaces/products/Product';
import { ProductsParameters } from '@shared/interfaces/backend/product/ProductsRequest';
import { Paginated } from '@shared/interfaces/products/Paginated';

const featureName = 'Products';
const featureModule = 'List';
const featureHeader = `[${featureName}] [${featureModule}]`;

export const onInitProducts = createAction(
  `${featureHeader}: Init`,
  props<{ productParams: ProductsParameters }>()
);

export const onInitProductsByCategory = createAction(
  `${featureHeader}: By Category Init`,
  props<{ categoryId: number; productParams: ProductsParameters }>()
);

export const onGetProducts = createAction(
  `${featureHeader}: Get Products Success`,
  props<{ products: Paginated<Product> }>()
);

export const onGetProductsError = createAction(
  `${featureHeader}: Get Products Error`,
  props<{ error: HttpErrorResponse }>()
);
