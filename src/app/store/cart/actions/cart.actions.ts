import { createAction, props } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';
import { CartResponse } from '@shared/interfaces/backend/cart/CartResponse';
import { Cart } from '@shared/interfaces/carts/Cart';

const featureName = 'Cart';
const featureModule = 'User';
const featureHeader = `[${featureName}] [${featureModule}]`;

// INIT CART
export const onCartInit = createAction(`${featureHeader}: Cart init`);

export const onCartError = createAction(
  `${featureHeader}: Cart ERROR`,
  props<{ error: HttpErrorResponse }>()
);

export const onCartSuccess = createAction(
  `${featureHeader}: Cart OK`,
  props<{ cart: CartResponse }>()
);

// UPDATE CART
export const onCartUpdate = createAction(
  `${featureHeader}: Cart Update`,
  props<{ cart: Cart }>()
);

export const onCartUpdateSuccess = createAction(
  `${featureHeader}: Cart Update OK`,
  props<{ cart: Cart }>()
);

export const onCartUpdateError = createAction(
  `${featureHeader}: Cart Update ERROR`,
  props<{ error: HttpErrorResponse }>()
);
