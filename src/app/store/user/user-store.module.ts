import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";

import { userFeatureKey } from "./feature-key";
import { userFeatureReducer } from "./reducers";
import { userFeatureFacades } from './facades';
import { userFeatureEffects } from './effects';
import { AuthServiceModule } from '@shared/services/auth/auth.service.module';

@NgModule({
  declarations: [],
  providers: [...userFeatureFacades],
  imports: [
    CommonModule,
    AuthServiceModule,
    StoreModule.forFeature(userFeatureKey, userFeatureReducer),
    EffectsModule.forFeature(userFeatureEffects)
  ]
})
export class UserStoreModule { }