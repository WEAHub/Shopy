import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

// Interfaces
import { LoginRequestBody } from '@interfaces/backend/login/LoginRequest';
import { User } from '@shared/interfaces/user/User';

// Actions
import { login } from '../actions/auth.actions';

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

  public login(loginData: LoginRequestBody): void {
    this.store.dispatch(login({ loginData }));
  }

  public getToken$(): Observable<string> {
    return this.store.select(getToken);
  }
}
