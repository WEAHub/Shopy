import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';

import {
  onGetProductsView,
  onGetProductsViewError,
  onInitProductsView,
} from '../actions/products-view.actions';
import { ProductsService } from '@shared/services/products/products.service';

@Injectable()
export class ProductsViewEffects {
  constructor(
    private actions$: Actions,
    private productsService: ProductsService
  ) {}

  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(onInitProductsView),
      switchMap(({ id }) =>
        this.productsService.getProduct(id).pipe(
          map(product => onGetProductsView({ product })),
          catchError(error => of(onGetProductsViewError({ error })))
        )
      )
    )
  );
}
