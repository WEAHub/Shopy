import {
  APP_INITIALIZER,
  ModuleWithProviders,
  NgModule,
} from '@angular/core';
import { CryptoService } from './crypto.service';

export interface AESParams {
  iv: string;
  key: string;
}

export function cryptoServiceFactory(
  cryptoService: CryptoService,
  aesParams: AESParams
) {
  return () => cryptoService.init(aesParams.key, aesParams.iv);
}

@NgModule()
export class CryptoServiceModule {
  static forRoot(
    key: string,
    iv: string
  ): ModuleWithProviders<CryptoServiceModule> {
    return {
      ngModule: CryptoServiceModule,
      providers: [
        {
          provide: 'aesParams',
          useValue: { key, iv },
        },
        {
          provide: APP_INITIALIZER,
          useFactory: cryptoServiceFactory,
          deps: [CryptoService, 'aesParams'],
          multi: true,
        },
      ],
    };
  }
}
