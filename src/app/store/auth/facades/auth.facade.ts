import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, take } from 'rxjs';

// Interfaces
import { LoginRequestBody } from '@shared/interfaces/backend/auth/LoginRequest';
import { User, UserTokens } from '@shared/interfaces/user/User';

// Actions
import {
  login,
  onLogout,
  onRefresh,
  onSetUserDetails,
} from '../actions/auth.actions';

// Selectors
import {
  getError,
  getToken,
  getUser,
  isAuthenticated,
  isLoading,
} from '../selectors/auth.selectors';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class AuthFacade {
  constructor(private store: Store) {}

  public isAuthenticated$(): Observable<boolean> {
    return this.store.select(isAuthenticated);
  }

  public isLoading$(): Observable<boolean> {
    return this.store.select(isLoading);
  }

  public getUser$(): Observable<User> {
    return this.store.select(getUser);
  }

  public getError$(): Observable<HttpErrorResponse> {
    return this.store.select(getError);
  }

  public getToken$(): Observable<UserTokens> {
    return this.store.select(getToken);
  }

  public login(loginData: LoginRequestBody): void {
    this.store.dispatch(login({ loginData }));
  }

  public forceLogin(): void {
    this.isAuthenticated$()
      .pipe(take(1))
      .subscribe(isAuth => {
        if (isAuth) return;

        const loginBody: LoginRequestBody = {
          email: '1@gmail.com',
          password: 'Yest123!!!XA2',
        };

        this.login(loginBody);
      });
  }

  public logout(): void {
    this.store.dispatch(onLogout());
  }

  public updateUser(id: number, userData: Partial<User>): void {
    this.store.dispatch(onSetUserDetails({ id, userData }));
  }

  public refreshToken(): void {
    this.getToken$()
      .pipe(take(1))
      .subscribe(tokens => this.store.dispatch(onRefresh({ tokens })));
  }
}
