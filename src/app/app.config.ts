import {
  ApplicationConfig,
  importProvidersFrom,
  isDevMode,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {
  provideClientHydration,
  withHttpTransferCacheOptions,
} from '@angular/platform-browser';
import { provideStoreDevtools } from '@ngrx/store-devtools';

import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';

import { provideAnimations } from '@angular/platform-browser/animations';
import { authInterceptor } from '@shared/services/interceptors/http.interceptor';
import { TranslateModule } from '@ngx-translate/core';
import { provideTranslation } from './config/translate.config';
import { inMemoryScrollingFeature } from './config/scroll.config';
import { AppStoreModule } from './store';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, inMemoryScrollingFeature),
    provideHttpClient(withFetch(), withInterceptors([authInterceptor])),
    provideClientHydration(
      withHttpTransferCacheOptions({ includePostRequests: true })
    ),
    provideAnimations(),
    importProvidersFrom([
      TranslateModule.forRoot(provideTranslation()),
      AppStoreModule,
    ]),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
  ],
};
