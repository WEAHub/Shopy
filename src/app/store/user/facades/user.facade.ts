import { Injectable } from "@angular/core";
import { LoginRequestBody } from "@interfaces/backend/login/LoginRequest";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { login } from '../actions/user.actions'

@Injectable()
export class UserFacade {

  constructor(private store: Store) {}

  public login(loginData: LoginRequestBody): void {
    this.store.dispatch(login({loginData}))
  }

}