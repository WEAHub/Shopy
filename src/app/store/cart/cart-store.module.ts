import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";

import { cartFeatureKey } from "./feature-key";
import { cartFeatureReducer } from "./reducers";
import { cartFeatureFacades } from './facades';
import { cartFeatureEffects } from './effects';
import { CartsServiceModule } from '@shared/services/carts/carts.service.module';

@NgModule({
  declarations: [],
  providers: [...cartFeatureFacades],
  imports: [
    CommonModule,
    CartsServiceModule,    
    StoreModule.forFeature(cartFeatureKey, cartFeatureReducer),
    EffectsModule.forFeature(cartFeatureEffects)
  ]
})
export class CartStoreModule { }