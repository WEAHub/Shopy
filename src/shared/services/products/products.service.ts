import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BackendService } from '../backend/backend.service';
import { ProductsEndpoints } from '@shared/interfaces/backend/product';
import { ProductsParameters } from '@shared/interfaces/backend/product/ProductsRequest';
import { ProductsResponseBody, ProductResponseBody } from '@shared/interfaces/backend/product/ProductsResponse';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(
    private backendService: BackendService,
    private httpClient: HttpClient
  ) {}

  public getProducts(options: Partial<ProductsParameters> = {}): Observable<ProductsResponseBody> {
    const endpoint = this.backendService.generateUrl(
      ProductsEndpoints.GET_PRODUCTS, 
      options
    )
    return this.httpClient.get<ProductsResponseBody>(endpoint);
  }

  public getProduct(id: number): Observable<ProductResponseBody> {
    const endpoint = this.backendService.generateUrl(
      ProductsEndpoints.GET_PRODUCTS
    ) + `${id}`
    return this.httpClient.get<ProductResponseBody>(endpoint);
  }

}
