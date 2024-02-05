import {
  ApplicationConfig,
  importProvidersFrom,
  isDevMode,
} from '@angular/core';
import {
  InMemoryScrollingFeature,
  InMemoryScrollingOptions,
  provideRouter,
  withInMemoryScrolling,
} from '@angular/router';

import { routes } from './app.routes';
import {
  provideClientHydration,
  withHttpTransferCacheOptions,
} from '@angular/platform-browser';
import { provideStoreDevtools } from '@ngrx/store-devtools';

import * as fromStore from './store';
import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { authInterceptor } from '@shared/services/interceptors/http.interceptor';

const scrollConfig: InMemoryScrollingOptions = {
  scrollPositionRestoration: 'top',
  anchorScrolling: 'enabled',
};

const inMemoryScrollingFeature: InMemoryScrollingFeature =
  withInMemoryScrolling(scrollConfig);

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, inMemoryScrollingFeature),
    provideHttpClient(withFetch(), withInterceptors([authInterceptor])),
    provideClientHydration(
      withHttpTransferCacheOptions({ includePostRequests: true })
    ),
    provideAnimations(),
    importProvidersFrom([fromStore.AppStoreModule]),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
  ],
};
