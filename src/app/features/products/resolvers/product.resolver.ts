import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { ProductViewFacade } from '@app/store/products';
import { Product } from '@shared/interfaces/products/Product';
import {
  Observable,
  catchError,
  combineLatest,
  filter,
  map,
  of,
  take,
} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductResolver implements Resolve<Product> {
  constructor(private productViewFacade: ProductViewFacade) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Product> {
    const productId = route.params['id'];
    return this.getProduct(productId);
  }

  private getProduct(productId: number): Observable<Product> {
    const productLoading$ = this.productViewFacade.isLoading$();
    const product$ = this.productViewFacade.getProduct$();

    this.productViewFacade.getProduct(productId);

    return combineLatest({
      isLoading: productLoading$,
      product: product$,
    }).pipe(
      filter(({ isLoading }) => !isLoading),
      take(1),
      map(({ product }) => product),
      catchError(() => of({ id: 0 } as Product))
    );
  }
}
