import { createAction, props } from "@ngrx/store";
import { HttpErrorResponse } from "@angular/common/http";
import { CartsResponse } from "@shared/interfaces/backend/cart/CartResponse";

const featureName = 'Cart';
const featureModule = 'User';
const featureHeader = `[${featureName}] [${featureModule}]`

export const onCarts = createAction(
  `${featureHeader}: Cart`
);

export const onCartsError = createAction(
  `${featureHeader}: Carts ERROR`,
  props<{ error: HttpErrorResponse }>()
);

export const onCartsSuccess = createAction(
  `${featureHeader}: Carts OK`,
  props<{ carts: CartsResponse }>()
);


