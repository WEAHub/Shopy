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
import { environment } from '@environments/environment';

enum HttpMethods {
  POST = 'POST',
  GET = 'GET',
}

const noTokenURIs = [
  [HttpMethods.GET, '/auth/refresh'],
  [HttpMethods.POST, '/auth/login'],
  [HttpMethods.GET, '/category'],
  [HttpMethods.GET, '/product'],
].map(processApiFilter);

function processApiFilter(endPoint: Array<string>): Array<string> {
  const [method, path] = endPoint;
  return [method, `${environment.apiURL}${path}`];
}

export const authInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  const authFacade = inject(AuthFacade);
  const isApiRequest = req.url.includes(environment.apiURL);
  const needToken =
    isApiRequest &&
    !noTokenURIs.find(
      ([method, path]) => req.url.includes(path) && req.method === method
    );

  const authData$ = combineLatest({
    isAuth: authFacade.isAuthenticated$(),
    tokens: authFacade.getToken$(),
    isRefreshing: authFacade.isRefreshing$(),
  });

  return authData$.pipe(
    take(1),
    mergeMap(async authData => {
      const { accessToken, refreshToken } = authData.tokens;
      const { isRefreshing, isAuth } = authData;

      if (!isAuth || !needToken) return req;

      const isExpired = await isTokenExpired(accessToken);

      if (!isExpired) {
        return setRequestToken(req, accessToken);
      }
      if (!isRefreshing) authFacade.refreshToken(refreshToken);

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
