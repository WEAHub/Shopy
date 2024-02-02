import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, switchMap, take } from 'rxjs';
import { BackendService } from '../backend/backend.service';
import { CartsEndpoints } from '@shared/interfaces/backend/cart';
import { CartsParameters } from '@shared/interfaces/backend/cart/CartRequest';
import {
  CartResponse,
  CartsResponse,
} from '@shared/interfaces/backend/cart/CartResponse';
import { Cart } from '@shared/interfaces/carts/Cart';
import { AuthFacade } from '@app/store/auth';
import { User } from '@shared/interfaces/user/User';

@Injectable({
  providedIn: 'root',
})
export class CartsService {
  constructor(
    private backendService: BackendService,
    private authFacade: AuthFacade,
    private httpClient: HttpClient
  ) {}

  public getCarts(options: CartsParameters): Observable<CartsResponse> {
    const endpoint = this.backendService.generateUrl(
      CartsEndpoints.CARTS,
      options
    );

    return this.httpClient.get<CartsResponse>(endpoint);
  }

  public getCart(): Observable<Cart> {
    return this.authFacade.isAuthenticated$().pipe(
      take(1),
      switchMap(isAuth => {
        if (!isAuth) return of({} as Cart);
        return this.authFacade.getUser$().pipe(
          take(1),
          switchMap((user: User) => {
            const endpoint: string =
              this.backendService.generateUrl(CartsEndpoints.CARTS) +
              `/${user.id}`;
            return this.httpClient.get<Cart>(endpoint);
          })
        );
      })
    );
  }

  public updateCart(cart: Cart): Observable<Cart> {
    const endpoint =
      this.backendService.generateUrl(CartsEndpoints.CARTS) + `${cart.id}`;

    return this.httpClient.patch<CartResponse>(endpoint, cart);
  }
}
