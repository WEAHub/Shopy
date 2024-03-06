/* eslint-disable @typescript-eslint/no-unused-vars */
import { createReducer, on } from '@ngrx/store';

import {
  login,
  onLoginError,
  onLoginSuccess,
  onLogout,
  onRefresh,
  onRefreshError,
  onRefreshSuccess,
  onSetUserDetailsSuccess,
} from '../actions/auth.actions';
import { AuthFeatureState } from '.';
import { createRehydrateReducer } from '@app/store/hydrate/hydration.reducer';
import { authFeatureKey } from '../feature-key';
import { User } from '@shared/interfaces/user/User';

export const initialAuthState: AuthFeatureState = {
  loading: false,
  error: undefined,
  entity: undefined,
  refreshing: false,
};

export const authReducer = createRehydrateReducer<AuthFeatureState>(
  {
    key: authFeatureKey,
    skipHydrateActions: [onLoginError, login, onRefresh, onRefreshError],
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
  }),
  on(onRefresh, state => {
    return {
      ...state,
      refreshing: true,
    };
  }),
  on(onRefreshSuccess, (state, { tokens }) => {
    return {
      ...state,
      refreshing: false,
      entity: {
        ...state.entity!,
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
      },
    };
  }),
  on(onRefreshError, (state, { error }) => {
    return {
      ...state,
      refreshing: false,
      error,
    };
  })
);
