import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AuthStoreModule } from './auth/auth-store.module';
import { CategoriesStoreModule } from './categories/categories-store.module';
import { ProductsStoreModule } from './products/products-store.module';
import { CartStoreModule } from './cart/cart-store.module';
import { CheckoutStoreModule } from './checkout/checkout-store.module';

export const featureStores = [
  CartStoreModule,
  AuthStoreModule,
  CategoriesStoreModule,
  ProductsStoreModule,
  CheckoutStoreModule,
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument(),
    ...featureStores,
  ],
})
export class AppStoreModule {}
