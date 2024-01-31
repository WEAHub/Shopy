import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { login, onLoginError, onLoginSuccess } from '../actions/auth.actions';
import { catchError, exhaustMap, map, of, switchMap } from 'rxjs';
import { AuthService } from '../../../../shared/services/auth/auth.service';
import { UserService } from '@shared/services/user/user.service';
import { decodeToken } from '@shared/utils/token.util';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private userService: UserService
  ) {}

  public login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(login),
      exhaustMap(({ loginData }) =>
        this.authService.login(loginData).pipe(
          switchMap(response => {
            const { sub: userId } = decodeToken(response.token);
            return this.userService.getUser(userId).pipe(
              map(user => ({
                ...user,
                ...response,
              })),
              map(userData => onLoginSuccess({ userData }))
            );
          }),
          catchError(error => of(onLoginError({ error })))
        )
      )
    )
  );
}
