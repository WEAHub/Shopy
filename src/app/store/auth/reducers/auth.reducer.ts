/* eslint-disable @typescript-eslint/no-unused-vars */
import { createReducer, on } from '@ngrx/store';

import {
  login,
  onLoginError,
  onLoginSuccess,
  onLogout,
  onSetUserDetailsSuccess,
} from '../actions/auth.actions';
import { AuthFeatureState } from '.';
import { createRehydrateReducer } from '@app/store/hydrate/hydration.reducer';
import { authFeatureKey } from '../feature-key';

export const initialAuthState: AuthFeatureState = {
  loading: false,
};

export const authReducer = createRehydrateReducer<AuthFeatureState>(
  {
    key: authFeatureKey,
    skipHydrateActions: [onLoginError, login],
  },
  initialAuthState,
  on(login, () => {
    return {
      error: undefined,
      entity: undefined,
      loading: true,
    };
  }),
  on(onLoginSuccess, (state, { userData }) => {
    return {
      ...state,
      entity: userData,
      loading: false,
      error: undefined,
    };
  }),
  on(onLogout, () => {
    return initialAuthState;
  }),
  on(onLoginError, (state, action) => {
    return {
      ...state,
      loading: false,
      error: action.error,
      entity: undefined,
    };
  }),
  on(onSetUserDetailsSuccess, (state, { userData }) => {
    return {
      ...state,
      loading: false,
      entity: { ...state.entity, ...userData },
    };
  })
);
