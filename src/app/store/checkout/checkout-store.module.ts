import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { checkoutFeatureKey } from './feature-key';
import { checkoutFeatureReducer } from './reducers';
import { checkoutFeatureFacades } from './facades';
import { checkoutFeatureEffects } from './effects';
import { CheckoutServiceModule } from '@/shared/services/checkout/checkout.service.module';
import { MessageService } from 'primeng/api';

@NgModule({
  declarations: [],
  providers: [...checkoutFeatureFacades, MessageService],
  imports: [
    CommonModule,
    CheckoutServiceModule,
    StoreModule.forFeature(checkoutFeatureKey, checkoutFeatureReducer),
    EffectsModule.forFeature(checkoutFeatureEffects),
  ],
})
export class CheckoutStoreModule {}
