import {createAction, props} from "@ngrx/store";
import { LoginRequestBody } from "@interfaces/backend/login/LoginRequest";
import { User } from "@shared/interfaces/user/User";
import { HttpErrorResponse } from "@angular/common/http";
import { Products } from "@shared/interfaces/products/Product";

const featureName = 'Products';
const featureModule = 'List';
const featureHeader = `[${featureName}] [${featureModule}]`


export const onInitProducts = createAction(
  `${featureHeader}: INIT`
);

export const onGetProducts = createAction(
  `${featureHeader}: Get Products`,
  props<{ products: Products }>()
);

export const onGetProductsError = createAction(
  `${featureHeader}: Get Products Error`,
  props<{ error: HttpErrorResponse }>()
);