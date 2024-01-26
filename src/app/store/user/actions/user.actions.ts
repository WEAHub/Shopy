import {createAction, props} from "@ngrx/store";
import { LoginRequestBody } from "@interfaces/backend/login/LoginRequest";
import { LoginResponseBody } from "@shared/interfaces/backend/login/LoginResponse";
import { User } from "@shared/interfaces/user/User";

const featureName = 'User';
const featureModule = 'Auth';

export const login = createAction(
  `[${featureName}] [${featureModule}]: Login`,
  props<{ loginData: LoginRequestBody }>()
);

export const onLoginError = createAction(
  `[${featureName}] [${featureModule}]: Login ERROR`,
  props<{ error: any }>()
);

export const onLoginSuccess = createAction(
  `[${featureName}] [${featureModule}]: Login OK`,
  props<{ userData: User }>()
);

export const setUserDetails = createAction(
  `[${featureName}] [${featureModule}]: Login USER DETAILS`,
  props<{ userDetails: User }>()
);

