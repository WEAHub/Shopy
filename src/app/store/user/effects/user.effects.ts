import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { login, onLoginError, onLoginSuccess } from "../actions/user.actions";
import { catchError, exhaustMap, map, of, switchMap, tap } from "rxjs";
import { AuthService } from "../../../../shared/services/auth/auth.service";
import { UserService } from "@shared/services/user.service";
import { decodeToken } from "@shared/utils/token.util";


@Injectable()
export class UserEffects {

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private userService: UserService
  ) {}

  public login$ = createEffect(
    () => this.actions$
      .pipe(
        ofType(login),
        exhaustMap(({ loginData }) => 
          this.authService.login(loginData)
            .pipe(
              switchMap(response => {
                const token = decodeToken(response.token)
                const userId = token.sub;
                
                return this.userService.getUser(userId)
                  .pipe(
                    map(user => ({
                      ...user,
                      ...response,
                    })),
                    map(userData => onLoginSuccess({userData}))
                  )
              }),
              catchError(error => of(onLoginError({error}))),
            )
      )
    )
  )

}