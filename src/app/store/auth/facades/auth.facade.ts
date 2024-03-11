import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, lastValueFrom, map, mergeMap, take } from 'rxjs';

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
  isRefreshing,
} from '../selectors/auth.selectors';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { isTokenExpired } from '@/shared/utils/token.util';

@Injectable()
export class AuthFacade {
  constructor(
    private store: Store,
    private router: Router
  ) {}

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

  public isRefreshing$(): Observable<boolean> {
    return this.store.select(isRefreshing);
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

  public refreshToken(refreshToken: string): void {
    this.store.dispatch(onRefresh({ refreshToken }));
  }

  public async checkToken(): Promise<void> {
    const isAuth: boolean = await lastValueFrom(
      this.isAuthenticated$().pipe(take(1))
    );

    if (!isAuth) return;

    const { accessToken, refreshToken } = await lastValueFrom(
      this.getToken$().pipe(take(1))
    );

    const isExpired = await isTokenExpired(accessToken);

    if (isExpired) {
      this.refreshToken(refreshToken);
    }
  }
}
