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
  onRefresh,
  onRefreshError,
  onRefreshSuccess,
  onSetUserDetails,
  onSetUserDetailsError,
  onSetUserDetailsSuccess,
} from '../actions/auth.actions';
import { catchError, exhaustMap, map, of, switchMap } from 'rxjs';
import { AuthService } from '../../../../shared/services/auth/auth.service';
import { UserService } from '@shared/services/user/user.service';
import { onCartInit } from '@app/store/cart/actions/cart.actions';
import { Action } from '@ngrx/store';
import { parseMessage } from '@shared/rx-pipes/backend-parse';
import { User } from '@shared/interfaces/user/User';

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
          switchMap(userData =>
            of(onLoginSuccess({ userData }), onCartInit())
          ),
          catchError(error => of(onLoginError({ error })))
        )
      )
    )
  );

  setDetails$ = createEffect(() =>
    this.actions$.pipe(
      ofType(onSetUserDetails),
      exhaustMap(({ userData }) =>
        this.userService.updateUser(userData).pipe(
          parseMessage<User>(),
          map(userData => onSetUserDetailsSuccess({ userData })),
          catchError(error => of(onSetUserDetailsError({ error })))
        )
      )
    )
  );

  refresh$ = createEffect(() =>
    this.actions$.pipe(
      ofType(onRefresh),
      exhaustMap(({ tokens }) =>
        this.authService.refresh(tokens.refreshToken).pipe(
          map(tokens => onRefreshSuccess({ tokens })),
          catchError(error => of(onRefreshError({ error })))
        )
      )
    )
  );
}
