/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { AuthFacade } from './auth.facade';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { getError, getToken } from '../selectors/auth.selectors';
import { onSetUserDetails } from '../actions/auth.actions';

const tokenMock = 'testToken';

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
const userMock = {
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

describe('AuthEffects', () => {
  let authFacade: AuthFacade;
  let store: MockStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthFacade,
        provideMockStore({
          selectors: [
            {
              selector: getError,
              value: errorMock,
            },
            {
              selector: getToken,
              value: tokenMock,
            },
          ],
        }),
        MockStore,
      ],
    });
    store = TestBed.inject(MockStore);
    authFacade = TestBed.inject(AuthFacade);
  });

  it('getError$ should return an observable with an error', done => {
    const selectSpy = jest.spyOn(store, 'select');

    authFacade.getError$().subscribe(error => {
      expect(error).toEqual(errorMock);
      done();
    });

    const expectedReturn = store.select(getError);

    expect(selectSpy).toHaveBeenCalled();
    expect(selectSpy).toHaveReturnedWith(expectedReturn);
  });

  it('getToken$ should return an observable with the user token', done => {
    const selectSpy = jest.spyOn(store, 'select');

    authFacade.getToken$().subscribe(token => {
      expect(token).toEqual(tokenMock);
      done();
    });

    const expectedReturn = store.select(getToken);

    expect(selectSpy).toHaveBeenCalled();
    expect(selectSpy).toHaveReturnedWith(expectedReturn);
  });

  it('updateUser$ should dispatch update the user store', () => {
    const dispatchSpy = jest.spyOn(store, 'dispatch');
    authFacade.updateUser(userMock);
    const expectedAction = onSetUserDetails({ userData: userMock });
    expect(dispatchSpy).toHaveBeenCalledWith(expectedAction);
  });
});
