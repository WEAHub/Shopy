import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";

import { categoriesFeatureKey } from "./feature-key";
import { categoriesFeatureReducer } from "./reducers";
import { categoriesFeatureFacades } from './facades';
import { categoriesFeatureEffects } from './effects';
import { CategoriesServiceModule } from '@shared/services/categories/categories.service.module';

@NgModule({
  declarations: [],
  providers: [...categoriesFeatureFacades],
  imports: [
    CommonModule,
    CategoriesServiceModule,    
    StoreModule.forFeature(categoriesFeatureKey, categoriesFeatureReducer),
    EffectsModule.forFeature(categoriesFeatureEffects)
  ]
})
export class categoriesStoreModule { }