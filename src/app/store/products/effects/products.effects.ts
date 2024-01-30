import { Injectable } from "@angular/core";
import { Actions, OnInitEffects, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, of, switchMap, tap } from "rxjs";

import { onGetProducts, onGetProductsError, onInitProducts } from "../actions/products.actions";
import { Action } from "@ngrx/store";
import { ProductsService } from "@shared/services/products/products.service";
import { randomizeProduct } from "@shared/utils/productRandomizer";

@Injectable()
export class ProductsEffects implements OnInitEffects {
  constructor(
    private actions$: Actions,
    private productsService: ProductsService
  ) {}

  ngrxOnInitEffects(): Action {
    return onInitProducts();
  }

  init$ = createEffect(() => 
    this.actions$.pipe(
      ofType(onInitProducts),
      switchMap(() => this.productsService.getProducts()
        .pipe(
          map(products => products.map(p => randomizeProduct(p))),
          map(products => onGetProducts({ products })),
          catchError(error => of(onGetProductsError({ error }))),
        )
      )
    )
  )

}
