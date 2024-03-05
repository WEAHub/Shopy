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

  return combineLatest([
    authFacade.isAuthenticated$(),
    authFacade.getToken$(),
    authFacade.isLoading$(),
  ]).pipe(
    take(1),
    switchMap(([isAuth, { accessToken }, loading]) => {
      if (isAuth && needToken) {
        const isExpired = isTokenExpired(accessToken);
        if (!loading && isExpired) authFacade.refreshToken();
        return combineLatest([
          authFacade.isLoading$(),
          authFacade.getToken$(),
        ]).pipe(
          filter(([_loading]) => !_loading),
          take(1),
          switchMap(([, tokens]) => {
            return next(
              req.clone({
                setHeaders: {
                  authorization: `Bearer ${tokens.accessToken}`,
                },
              })
            );
          })
        );
      }
      return next(req);
    })
  );
};
