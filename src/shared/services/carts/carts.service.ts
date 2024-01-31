import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BackendService } from '../backend/backend.service';
import { CartsEndpoints } from '@shared/interfaces/backend/cart';
import { CartsParameters } from '@shared/interfaces/backend/cart/CartRequest';
import { CartsResponse } from '@shared/interfaces/backend/cart/CartResponse';

@Injectable({
  providedIn: 'root',
})
export class CartsService {
  constructor(
    private backendService: BackendService,
    private httpClient: HttpClient
  ) {}

  public getCarts(options: CartsParameters): Observable<CartsResponse> {
    const endpoint = this.backendService.generateUrl(
      CartsEndpoints.CARTS,
      options
    );

    return this.httpClient.get<CartsResponse>(endpoint);
  }
}
