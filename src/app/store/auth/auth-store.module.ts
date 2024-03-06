import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { authFeatureKey } from './feature-key';
import { authFeatureReducer } from './reducers';
import { authFeatureFacades } from './facades';
import { authFeatureEffects } from './effects';
import { AuthServiceModule } from '@shared/services/auth/auth.service.module';
import { UserServiceModule } from '@shared/services/user/user.service.module';
import { MessageService } from 'primeng/api';

@NgModule({
  declarations: [],
  providers: [...authFeatureFacades, MessageService],
  imports: [
    CommonModule,
    AuthServiceModule,
    UserServiceModule,
    StoreModule.forFeature(authFeatureKey, authFeatureReducer),
    EffectsModule.forFeature(authFeatureEffects),
  ],
})
export class AuthStoreModule {}
