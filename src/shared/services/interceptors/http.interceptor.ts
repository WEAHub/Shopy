import {
  HttpInterceptorFn,
  HttpRequest,
  HttpHandlerFn,
  HttpEvent,
} from '@angular/common/http';
import {
  Observable,
  combineLatest,
  filter,
  lastValueFrom,
  map,
  mergeMap,
  switchMap,
  take,
} from 'rxjs';
import { inject } from '@angular/core';
import { AuthFacade } from '@app/store/auth';
import { isTokenExpired } from '@shared/utils/token.util';

//REFACTOR DEL FILTRO DE API
const noTokenURIs = [
  '/auth/refresh',
  '/auth/login',
  '/category',
  '/product',
  '/assets',
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
    isRefreshing: authFacade.isRefreshing$(),
  });

  return authData$.pipe(
    take(1),
    mergeMap(async authData => {
      const { accessToken } = authData.tokens;
      const { isRefreshing, isAuth } = authData;

      if (!isAuth || !needToken) return req;

      const isExpired = isTokenExpired(accessToken);

      if (!isExpired) return setRequestToken(req, accessToken);
      if (!isRefreshing) authFacade.refreshToken();

      return await lastValueFrom(
        authData$.pipe(
          filter(({ isRefreshing }) => !isRefreshing),
          map(({ tokens }) => setRequestToken(req, tokens.accessToken)),
          take(1)
        )
      );
    }),
    switchMap(req => next(req))
  );

  // TRY 2
  /*
    return authData$.pipe(
      take(1),
      mergeMap(async authData => {
        const { accessToken } = authData.tokens;
        const { isRefreshing, isAuth } = authData;

        if (!isAuth || !needToken) return req;

        const isExpired = true; //isTokenExpired(accessToken);

        if (!isExpired) return setRequestToken(req, accessToken);
        if (!isRefreshing) authFacade.refreshToken();

        return await lastValueFrom(
          authData$.pipe(
            filter(({ isRefreshing }) => !isRefreshing),
            map(({ tokens }) => setRequestToken(req, tokens.accessToken)),
            take(1)
          )
        );
      }),
      switchMap(req => next(req))
    );
  */

  // TRY 1
  /*
    return authData$.pipe(
      take(1),
      switchMap(authData => {
        if (authData.isAuth && needToken) {
          const isExpired = isTokenExpired(authData.tokens.accessToken);
          if (!authData.isRefreshing && isExpired) authFacade.refreshToken();
          return authData$.pipe(
            filter(p => !p.isRefreshing),
            switchMap(p => next(setRequestToken(req, p.tokens.accessToken)))
          );
        }
        return next(req);
      })
    );
  */
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
