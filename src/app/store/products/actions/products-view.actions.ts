import { createAction, props } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';
import { Product } from '@shared/interfaces/products/Product';

const featureName = 'Products';
const featureModule = 'View';
const featureHeader = `[${featureName}] [${featureModule}]`;

export const onInitProductsView = createAction(
  `${featureHeader}: Init`,
  props<{ id: number }>()
);

export const onGetProductsView = createAction(
  `${featureHeader}: Get Products`,
  props<{ product: Product }>()
);

export const onGetProductsViewError = createAction(
  `${featureHeader}: Get Products Error`,
  props<{ error: HttpErrorResponse }>()
);
