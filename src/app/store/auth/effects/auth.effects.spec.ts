/* eslint-disable @typescript-eslint/no-explicit-any */
import { AuthService } from '@shared/services/auth/auth.service';
import { provideMockActions } from '@ngrx/effects/testing';
import { TestBed } from '@angular/core/testing';

import { AuthEffects } from './auth.effects';
import { Observable, of } from 'rxjs';
import * as TypeMoq from 'typemoq';
import { UserService } from '@shared/services/user/user.service';
import { Action } from '@ngrx/store';
import { Actions } from '@ngrx/effects';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {
  login,
  onLoginSuccess,
  onSetUserDetails,
  onSetUserDetailsSuccess,
} from '../actions/auth.actions';
import { tokenResponseMock, userMock } from '@shared/mocks/tests';

describe('AuthEffects', () => {
  let effects: AuthEffects;
  let actions$ = new Observable<Action>();

  const mockAuthService: TypeMoq.IMock<AuthService> =
    TypeMoq.Mock.ofType<AuthService>();

  const mockUserService: TypeMoq.IMock<UserService> =
    TypeMoq.Mock.ofType<UserService>();

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthEffects,
        {
          provide: AuthService,
          useFactory: () => mockAuthService.object,
        },
        {
          provide: UserService,
          useFactory: () => mockUserService.object,
        },
        provideMockActions(() => actions$),
      ],
    });

    actions$ = TestBed.inject(Actions);
    effects = TestBed.inject(AuthEffects);
  });

  it('login$ should return onLoginSuccess action', () => {
    const { username, password } = userMock;

    const loginData = {
      username,
      password,
    };

    mockAuthService
      .setup(x => x.login(loginData))
      .returns(() => of(tokenResponseMock))
      .verifiable();

    mockUserService
      .setup(x => x.getUser(userMock.id))
      .returns(() => of(userMock));

    const expectedAction = onLoginSuccess({
      userData: userMock,
    });

    actions$ = of(login({ loginData }));

    effects.login$.subscribe(x => expect(x).toEqual(expectedAction));

    mockAuthService.verifyAll();
    mockUserService.verifyAll();
  });

  it('setDetails$ should return onSetUserDetailsSuccess action', () => {
    mockUserService
      .setup(x => x.updateUser(userMock))
      .returns(() => of(userMock));

    const expectedAction = onSetUserDetailsSuccess({ userData: userMock });
    actions$ = of(onSetUserDetails({ userData: userMock }));
    effects.setDetails$.subscribe(x => expect(x).toEqual(expectedAction));

    mockUserService.verifyAll();
  });
});
