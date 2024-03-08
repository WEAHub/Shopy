import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BackendService } from '../backend/backend.service';

import { CheckoutResponse } from '@/shared/interfaces/backend/checkout/CheckoutResponse';
import { CheckoutEndpoints } from '@/shared/interfaces/backend/checkout';

@Injectable({
  providedIn: 'root',
})
export class CheckoutService {
  constructor(
    private backendService: BackendService,
    private httpClient: HttpClient
  ) {}

  public getCheckout(): Observable<CheckoutResponse> {
    const endpoint = this.backendService.generateUrl(
      CheckoutEndpoints.GET_CHECKOUT
    );

    return this.httpClient.get<CheckoutResponse>(endpoint);
  }
}
