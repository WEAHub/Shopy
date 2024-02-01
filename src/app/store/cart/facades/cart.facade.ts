import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { CartResponse } from '@shared/interfaces/backend/cart/CartResponse';
import { Observable } from 'rxjs';
import {
  getCart,
  getCartProductsCount,
  isLoading,
} from '../selectors/cart.selectors';

@Injectable()
export class CartFacade {
  constructor(private store: Store) {}

  public isLoading$(): Observable<boolean> {
    return this.store.select(isLoading);
  }

  public getCart$(): Observable<CartResponse> {
    return this.store.select(getCart);
  }

  public getCartProductsCount$(): Observable<number> {
    return this.store.select(getCartProductsCount);
  }
}
