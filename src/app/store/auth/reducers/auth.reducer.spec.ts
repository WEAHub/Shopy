import { errorMock, userMock } from '@shared/mocks/tests';
import {
  login,
  onLoginError,
  onLoginSuccess,
  onLogout,
  onSetUserDetailsSuccess,
} from '../actions/auth.actions';
import { authReducer, initialAuthState } from './auth.reducer';

describe('Auth Reducer', () => {
  it('should have initial state with loading = true', () => {
    const expected = {
      loading: true,
      entity: undefined,
      error: undefined,
    };
    const action = login;
    expect(authReducer(initialAuthState, action)).toEqual(expected);
  });

  it('should have user entity when login success', () => {
    const state = {
      loading: true,
      entity: undefined,
      error: undefined,
    };
    const expected = {
      loading: false,
      entity: userMock,
      error: undefined,
    };
    const action = onLoginSuccess({ userData: userMock });
    expect(authReducer(state, action)).toEqual(expected);
  });

  it('should have error response when login error', () => {
    const state = {
      loading: true,
      entity: userMock,
      error: undefined,
    };
    const expected = {
      loading: false,
      entity: undefined,
      error: errorMock,
    };
    const action = onLoginError({ error: errorMock });
    expect(authReducer(state, action)).toEqual(expected);
  });

  it('should update user details when success', () => {
    const state = {
      loading: true,
      entity: undefined,
      error: undefined,
    };

    const userMockModified = {
      ...userMock,
      name: {
        ...userMock.name,
        firstname: 'test',
      },
    };

    const expected = {
      loading: false,
      entity: userMockModified,
      error: undefined,
    };
    const action = onSetUserDetailsSuccess({ userData: userMockModified });
    expect(authReducer(state, action)).toEqual(expected);
  });

  it('should init onLogout and restore initial state', () => {
    const expected = initialAuthState;
    const action = onLogout;
    expect(authReducer(initialAuthState, action)).toEqual(expected);
  });
});
