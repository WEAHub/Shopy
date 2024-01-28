import {createAction, props} from "@ngrx/store";
import { LoginRequestBody } from "@interfaces/backend/login/LoginRequest";
import { User } from "@shared/interfaces/user/User";
import { HttpErrorResponse } from "@angular/common/http";
import { Categories } from "@shared/interfaces/categories/Category";

const featureName = 'Categories';
const featureModule = 'List';
const featureHeader = `[${featureName}] [${featureModule}]`


export const onInitCategories = createAction(
  `${featureHeader}: INIT`
);

export const onGetCategories = createAction(
  `${featureHeader}: Get Categories`,
  props<{ categories: Categories }>()
);

export const onGetCategoriesError = createAction(
  `${featureHeader}: Get Categories Error`,
  props<{ error: HttpErrorResponse }>()
);