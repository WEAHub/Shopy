import {
  login,
  onLoginError,
  onLoginSuccess,
  onSetUserDetailsSuccess,
} from '../actions/auth.actions';
import { authReducer, initialAuthState } from './auth.reducer';
import { User } from '@shared/interfaces/user/User';

const userMock: User = {
  address: {
    city: 'Test',
    number: 21,
    street: 'Test',
    zipcode: '123123',
    address: 'Test Address',
    province: 'test',
    geolocation: { lat: '12', long: '34' },
  },
  id: 2,
  email: 'morrison@gmail.com',
  password: '83r5^_',
  name: { firstname: 'david', lastname: 'morrison' },
  phone: '1-570-236-7033',
  token: 'testToken',
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const errorMock: any = {
  status: 401,
  statusText: 'Unknown Error',
  url: 'https://fakestoreapi.com/auth/login',
  ok: false,
  name: 'HttpErrorResponse',
  message:
    'Http failure response for https://fakestoreapi.com/auth/login: 401 ',
  error: {},
};

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
});
