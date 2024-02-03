import {
  ApplicationConfig,
  importProvidersFrom,
  isDevMode,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideStoreDevtools } from '@ngrx/store-devtools';

import * as fromStore from './store';
import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { authInterceptor } from '@shared/services/interceptors/http.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideHttpClient(withFetch()),
    provideClientHydration(),
    provideAnimations(),
    importProvidersFrom(fromStore.AppStoreModule),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
  ],
};
