import { Injectable } from "@angular/core";
import { LoginRequestBody } from "@interfaces/backend/login/LoginRequest";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { login } from '../actions/auth.actions'
import { getUser, isAuthenticated } from "../selectors/auth.selectors";
import { User } from "@shared/interfaces/user/User";

@Injectable()
export class AuthFacade {

  constructor(private store: Store) {}

  public isAuthenticated(): Observable<boolean> {
    return this.store.select(isAuthenticated)
  }

  public getUser(): Observable<User | undefined> {
    return this.store.select(getUser);
  }

  public login(loginData: LoginRequestBody): void {
    this.store.dispatch(login({loginData}))
  }

}