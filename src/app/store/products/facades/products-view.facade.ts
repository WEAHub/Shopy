import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import {
  isLoading,
  getProduct,
  getError,
} from '../selectors/product-view.selectors';
import { Product } from '@shared/interfaces/products/Product';
import { onInitProductsView } from '../actions/products-view.actions';

@Injectable()
export class ProductViewFacade {
  constructor(private store: Store) {}

  public isLoading$(): Observable<boolean> {
    return this.store.select(isLoading);
  }

  public getProduct$(): Observable<Product> {
    return this.store.select(getProduct);
  }

  public getError$(): Observable<HttpErrorResponse> {
    return this.store.select(getError);
  }

  public getProduct(id: number): void {
    this.store.dispatch(onInitProductsView({ id }));
  }
}
