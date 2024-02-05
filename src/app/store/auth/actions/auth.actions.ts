import { createAction, props } from '@ngrx/store';
import { LoginRequestBody } from '@interfaces/backend/login/LoginRequest';
import { User } from '@shared/interfaces/user/User';
import { HttpErrorResponse } from '@angular/common/http';

const featureName = 'Auth';
const featureModule = 'User';
const featureHeader = `[${featureName}] [${featureModule}]`;

export const login = createAction(
  `${featureHeader}: Login`,
  props<{ loginData: LoginRequestBody }>()
);

export const onLoginError = createAction(
  `${featureHeader}: Login Error`,
  props<{ error: HttpErrorResponse }>()
);

export const onLoginSuccess = createAction(
  `${featureHeader}: Login Success`,
  props<{ userData: User }>()
);

export const onSetUserDetails = createAction(
  `${featureHeader}: Set Details Init`,
  props<{ userData: Partial<User> }>()
);

export const onSetUserDetailsSuccess = createAction(
  `${featureHeader}: Set Details Success`,
  props<{ userData: User }>()
);

export const onSetUserDetailsError = createAction(
  `${featureHeader}: Set Details Error`,
  props<{ error: HttpErrorResponse }>()
);

export const onLogout = createAction(`${featureHeader}: Logout`);
