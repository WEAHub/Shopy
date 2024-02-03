import {
  HttpInterceptorFn,
  HttpRequest,
  HttpHandlerFn,
  HttpEvent,
} from '@angular/common/http';
import { Observable, switchMap, take } from 'rxjs';
import { inject } from '@angular/core';
import { AuthFacade } from '@app/store/auth';

export const authInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  const authFacade = inject(AuthFacade);

  return authFacade.isAuthenticated$().pipe(
    take(1),
    switchMap(isAuth => {
      if (isAuth) {
        return authFacade.getToken$().pipe(
          take(1),
          switchMap(token => {
            console.log(token);
            const _req = req.clone({
              setHeaders: {
                authorization: `Bearer ${token}`,
              },
            });
            return next(_req);
          })
        );
      }

      return next(req);
    })
  );
};
