import { Injectable } from '@angular/core';
import { Actions, OnInitEffects, createEffect, ofType } from '@ngrx/effects';
import { login, onLoginError, onLoginSuccess } from '../actions/auth.actions';
import { catchError, exhaustMap, map, of, switchMap, take } from 'rxjs';
import { AuthService } from '../../../../shared/services/auth/auth.service';
import { UserService } from '@shared/services/user/user.service';
import { decodeToken } from '@shared/utils/token.util';
import { onCartInit } from '@app/store/cart/actions/cart.actions';
import { Action } from '@ngrx/store';
import { AuthFacade } from '../facades';

@Injectable()
export class AuthEffects implements OnInitEffects {
  constructor(
    private actions$: Actions,
    private authFacade: AuthFacade,
    private authService: AuthService,
    private userService: UserService
  ) {}

  ngrxOnInitEffects(): Action {
    return onCartInit();
  }

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

  public loginSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(onLoginSuccess),
      map(() => onCartInit())
    )
  );
}
