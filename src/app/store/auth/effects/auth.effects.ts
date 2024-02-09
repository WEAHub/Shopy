import { Injectable } from '@angular/core';
import {
  Actions,
  OnInitEffects,
  createEffect,
  ofType,
} from '@ngrx/effects';
import {
  login,
  onLoginError,
  onLoginSuccess,
  onSetUserDetails,
  onSetUserDetailsError,
  onSetUserDetailsSuccess,
} from '../actions/auth.actions';
import { catchError, exhaustMap, map, of, switchMap } from 'rxjs';
import { AuthService } from '../../../../shared/services/auth/auth.service';
import { UserService } from '@shared/services/user/user.service';
import { decodeToken } from '@shared/utils/token.util';
import { onCartInit } from '@app/store/cart/actions/cart.actions';
import { Action } from '@ngrx/store';

@Injectable()
export class AuthEffects implements OnInitEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private userService: UserService
  ) {}

  ngrxOnInitEffects(): Action {
    return onCartInit();
  }

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(login),
      exhaustMap(({ loginData }) =>
        this.authService.login(loginData).pipe(
          switchMap(response => {
            const { sub: userId } = decodeToken(response.token);
            return this.userService.getUser(userId).pipe(
              map(user => ({ ...user, ...response })),
              map(userData => onLoginSuccess({ userData }))
            );
          }),
          catchError(error => of(onLoginError({ error })))
        )
      )
    )
  );

  loginSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(onLoginSuccess),
      map(() => onCartInit())
    )
  );

  setDetails$ = createEffect(() =>
    this.actions$.pipe(
      ofType(onSetUserDetails),
      exhaustMap(({ userData }) =>
        this.userService.updateUser(userData).pipe(
          map(userData => onSetUserDetailsSuccess({ userData })),
          catchError(error => of(onSetUserDetailsError({ error })))
        )
      )
    )
  );
}
