import { createAction, props } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';
import { Products } from '@shared/interfaces/products/Product';

const featureName = 'Products';
const featureModule = 'Featured';
const featureHeader = `[${featureName}] [${featureModule}]`;

export const onInitProductsFeatured = createAction(
  `${featureHeader}: Init`
);

export const onGetProductsFeatured = createAction(
  `${featureHeader}: Get Products Success`,
  props<{ products: Products }>()
);

export const onGetProductsFeaturedError = createAction(
  `${featureHeader}: Get Products Error`,
  props<{ error: HttpErrorResponse }>()
);
