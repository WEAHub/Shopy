import {
  HttpInterceptorFn,
  HttpRequest,
  HttpHandlerFn,
  HttpEvent,
} from '@angular/common/http';
import { Observable, combineLatest, filter, switchMap, take } from 'rxjs';
import { inject } from '@angular/core';
import { AuthFacade } from '@app/store/auth';
import { isTokenExpired } from '@shared/utils/token.util';

const noTokenURIs = [
  'auth/refresh',
  'auth/login',
  '/category/',
  '/product/?',
  '/assets/',
];

export const authInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  const authFacade = inject(AuthFacade);
  const needToken = !noTokenURIs.find(u => req.url.includes(u));

  const authData$ = combineLatest({
    isAuth: authFacade.isAuthenticated$(),
    tokens: authFacade.getToken$(),
    isLoading: authFacade.isLoading$(),
  });

  const refreshingState$ = combineLatest({
    isLoading: authFacade.isLoading$(),
    tokens: authFacade.getToken$(),
  });

  return authData$.pipe(
    take(1),
    switchMap(authData => {
      if (authData.isAuth && needToken) {
        const isExpired = isTokenExpired(authData.tokens.accessToken);
        if (!authData.isLoading && isExpired) authFacade.refreshToken();
        return refreshingState$.pipe(
          filter(refreshState => !refreshState.isLoading),
          take(1),
          switchMap(refreshState =>
            next(setRequestToken(req, refreshState.tokens.accessToken))
          )
        );
      }
      return next(req);
    })
  );
};

function setRequestToken(
  req: HttpRequest<unknown>,
  accessToken: string
): HttpRequest<unknown> {
  return req.clone({
    setHeaders: {
      authorization: `Bearer ${accessToken}`,
    },
  });
}
