import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import {
  isLoading,
  getProducts,
  getError,
} from '../selectors/products-featured.selectors';
import { Products } from '@shared/interfaces/products/Product';

@Injectable()
export class ProductsFeaturedFacade {
  constructor(private store: Store) {}

  public isLoading$(): Observable<boolean> {
    return this.store.select(isLoading);
  }

  public getProducts$(): Observable<Products> {
    return this.store.select(getProducts);
  }

  public getError$(): Observable<HttpErrorResponse> {
    return this.store.select(getError);
  }
}
