import { computed, inject } from '@angular/core';
import { patchState, signalStore, withComputed, withHooks, withMethods, withState } from '@ngrx/signals';
import { Products } from '@shared/interfaces/products/Product';
import { ProductsService } from '@shared/services/products/products.service';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap } from 'rxjs';
import { ProductsParameters, ProductsSorts } from '@shared/interfaces/backend/product/ProductsRequest';
import { tapResponse } from '@ngrx/operators';
import { randomizeProduct } from '@shared/utils/productRandomizer';

interface LandingFeaturedState {
  products: Products
  loading: boolean
}

const landingFeaturedInitialState: LandingFeaturedState = {
  products: [],
  loading: false
}

const productsOptions: ProductsParameters = {
  limit: 4,
  sort: ProductsSorts.DESC
}

export const LandingFeaturedStore = signalStore(
  { providedIn: 'root' },
  withState<LandingFeaturedState>(landingFeaturedInitialState),
  withMethods((
    store, 
    productsService = inject(ProductsService)
  ) => ({
      listProducts: rxMethod<void>(
        pipe(
          switchMap(() => 
            productsService.getProducts(productsOptions)
            .pipe(
              tapResponse({
                next: (products) => {
                  products = products.map(randomizeProduct);
                  patchState(store, { products, loading: false })
                },
                error: () => {
                  patchState(store, landingFeaturedInitialState)
                }
              })
            ) 
          )
        )
      )
    })
  ),
  withHooks({
    onInit(store) {
      patchState(store, {
        loading: true
      })
      store.listProducts()
    }
  })
);

