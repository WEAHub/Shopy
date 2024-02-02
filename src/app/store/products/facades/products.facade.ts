import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, map, take } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import {
  isLoading,
  getProducts,
  getError,
  getProductById,
  getProductByCategory,
} from '../selectors/products.selectors';
import { Product, Products } from '@shared/interfaces/products/Product';
import { ProductsParameters } from '@shared/interfaces/backend/product/ProductsRequest';
import {
  onInitProducts,
  onInitProductsByCategory,
} from '../actions/products.actions';

@Injectable()
export class ProductsFacade {
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

  public findProductsByWord$(query: string): Observable<Products> {
    query = query.toLowerCase();
    return this.getProducts$().pipe(
      take(1),
      map((products: Products) =>
        products.filter(
          p =>
            p.title.toLowerCase().indexOf(query) > -1 ||
            p.description.toLowerCase().indexOf(query) > -1
        )
      )
    );
  }

  public findProductById$(id: number): Observable<Product | undefined> {
    return this.store.select(getProductById(id));
  }

  public getProductsByCategory$(category: string): Observable<Products> {
    return this.store.select(getProductByCategory(category));
  }

  public getProducts(productParams: ProductsParameters): void {
    this.store.dispatch(onInitProducts({ productParams }));
  }

  public getProductsByCategory(
    category: string,
    productParams: ProductsParameters
  ): void {
    this.store.dispatch(onInitProductsByCategory({ category, productParams }));
  }
}
