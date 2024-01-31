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
import { provideHttpClient, withFetch } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withFetch()),
    provideClientHydration(),
    importProvidersFrom(BrowserAnimationsModule, fromStore.AppStoreModule),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
  ],
};
