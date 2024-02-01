import { createAction, props } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';
import { CartResponse } from '@shared/interfaces/backend/cart/CartResponse';

const featureName = 'Cart';
const featureModule = 'User';
const featureHeader = `[${featureName}] [${featureModule}]`;

export const onCartInit = createAction(`${featureHeader}: Cart init`);

export const onCartError = createAction(
  `${featureHeader}: Carts ERROR`,
  props<{ error: HttpErrorResponse }>()
);

export const onCartSuccess = createAction(
  `${featureHeader}: Carts OK`,
  props<{ cart: CartResponse }>()
);
