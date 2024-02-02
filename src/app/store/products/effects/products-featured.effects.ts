import { Injectable } from '@angular/core';
import { Actions, OnInitEffects, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';

import {
  onGetProductsFeatured,
  onGetProductsFeaturedError,
  onInitProductsFeatured,
} from '../actions/products-featured.actions';
import { Action } from '@ngrx/store';
import { ProductsService } from '@shared/services/products/products.service';

@Injectable()
export class ProductsFeaturedEffects implements OnInitEffects {
  constructor(
    private actions$: Actions,
    private productsService: ProductsService
  ) {}

  ngrxOnInitEffects(): Action {
    return onInitProductsFeatured();
  }

  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(onInitProductsFeatured),
      switchMap(() =>
        this.productsService
          .getProducts({
            limit: 6,
          })
          .pipe(
            map(products => onGetProductsFeatured({ products })),
            catchError(error => of(onGetProductsFeaturedError({ error })))
          )
      )
    )
  );
}
