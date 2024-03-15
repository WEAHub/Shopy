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
import { authInterceptor } from '@/shared/interceptors/http.interceptor';
import { TranslateModule } from '@ngx-translate/core';
import { provideTranslation } from './config/translate.config';
import { inMemoryScrollingFeature } from './config/scroll.config';
import { AppStoreModule } from './store';
import { CryptoServiceModule } from '@/shared/services/crypto/crypto.module';
import { environment } from '@/environments/environment.base';
import { errorInterceptor } from '@/shared/interceptors/error.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, inMemoryScrollingFeature),
    provideAnimations(),
    provideHttpClient(
      withFetch(),
      withInterceptors([errorInterceptor, authInterceptor])
    ),
    provideClientHydration(
      withHttpTransferCacheOptions({ includePostRequests: true })
    ),
    importProvidersFrom([
      TranslateModule.forRoot(provideTranslation()),
      AppStoreModule,
      CryptoServiceModule.forRoot(
        environment.cipher.secret,
        environment.cipher.iv
      ),
    ]),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
  ],
};
