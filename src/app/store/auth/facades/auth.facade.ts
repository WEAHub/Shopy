import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, lastValueFrom, take } from 'rxjs';

// Interfaces
import { LoginRequestBody } from '@interfaces/backend/login/LoginRequest';
import { User } from '@shared/interfaces/user/User';

// Actions
import { login, onLogout, onSetUserDetails } from '../actions/auth.actions';

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

  public getToken$(): Observable<string> {
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
          username: 'mor_2314',
          password: '83r5^_',
        };

        this.login(loginBody);
      });
  }

  public logout(): void {
    this.store.dispatch(onLogout());
  }

  public updateUser(userData: Partial<User>): void {
    this.store.dispatch(onSetUserDetails({ userData }));
  }
}
