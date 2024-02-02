import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';

import {
  onGetProducts,
  onGetProductsError,
  onInitProducts,
} from '../actions/products.actions';
import { ProductsService } from '@shared/services/products/products.service';

@Injectable()
export class ProductsEffects {
  constructor(
    private actions$: Actions,
    private productsService: ProductsService
  ) {}

  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(onInitProducts),
      switchMap(() =>
        this.productsService.getProducts().pipe(
          map(products => onGetProducts({ products })),
          catchError(error => of(onGetProductsError({ error })))
        )
      )
    )
  );
}
