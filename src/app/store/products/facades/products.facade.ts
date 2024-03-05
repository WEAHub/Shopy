import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
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
import { Paginated } from '@shared/interfaces/products/Paginated';

@Injectable()
export class ProductsFacade {
  constructor(private store: Store) {}

  public isLoading$(): Observable<boolean> {
    return this.store.select(isLoading);
  }

  public getProducts$(): Observable<Paginated<Product>> {
    return this.store.select(getProducts);
  }

  public getError$(): Observable<HttpErrorResponse> {
    return this.store.select(getError);
  }
  /* 
  public findProductsByWord$(query: string): Observable<Paginated<Product>> {
    query = query.toLowerCase();
    return this.getProducts$().pipe(
      take(1),
      map((products: Products) =>
        products.data.filter(
          p =>
            p.title.toLowerCase().indexOf(query) > -1 ||
            p.description.toLowerCase().indexOf(query) > -1
        )
      )
    );
  }
 */
  public findProductById$(id: number): Observable<Product | undefined> {
    return this.store.select(getProductById(id));
  }

  public getProductsByCategory$(categoryId: number): Observable<Products> {
    return this.store.select(getProductByCategory(categoryId));
  }

  public getProducts(productParams: ProductsParameters): void {
    this.store.dispatch(onInitProducts({ productParams }));
  }

  public getProductsByCategory(
    categoryId: number,
    productParams: ProductsParameters
  ): void {
    this.store.dispatch(
      onInitProductsByCategory({ categoryId, productParams })
    );
  }
}
