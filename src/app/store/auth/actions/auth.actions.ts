import {createAction, props} from "@ngrx/store";
import { LoginRequestBody } from "@interfaces/backend/login/LoginRequest";
import { User } from "@shared/interfaces/user/User";
import { HttpErrorResponse } from "@angular/common/http";

const featureName = 'Auth';
const featureModule = 'User';
const featureHeader = `[${featureName}] [${featureModule}]`

export const login = createAction(
  `${featureHeader}: Login`,
  props<{ loginData: LoginRequestBody }>()
);

export const onLoginError = createAction(
  `${featureHeader}: Login ERROR`,
  props<{ error: HttpErrorResponse }>()
);

export const onLoginSuccess = createAction(
  `${featureHeader}: Login OK`,
  props<{ userData: User }>()
);

export const setUserDetails = createAction(
  `${featureHeader}: Login USER DETAILS`,
  props<{ userDetails: User }>()
);

