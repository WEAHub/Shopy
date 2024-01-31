import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { productsFeatureKey } from './feature-key';
import { productsFeatureReducer } from './reducers';
import { productsFeatureFacades } from './facades';
import { productsFeatureEffects } from './effects';
import { ProductsServiceModule } from '@shared/services/products/products.service.module';

@NgModule({
  declarations: [],
  providers: [...productsFeatureFacades],
  imports: [
    CommonModule,
    ProductsServiceModule,
    StoreModule.forFeature(productsFeatureKey, productsFeatureReducer),
    EffectsModule.forFeature(productsFeatureEffects),
  ],
})
export class ProductsStoreModule {}
