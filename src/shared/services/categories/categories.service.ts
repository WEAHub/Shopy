import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BackendService } from '../backend/backend.service';
import { CategoriesResponseBody } from '@shared/interfaces/backend/categories/CategoriesResponse';
import { CategoriesEndpoints } from '@shared/interfaces/backend/categories';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  constructor(
    private backendService: BackendService,
    private httpClient: HttpClient
  ) {}

  public getCategories(): Observable<CategoriesResponseBody> {
    const endpoint = this.backendService.generateUrl(
      CategoriesEndpoints.GET_CATEGORIES
    );
    return this.httpClient.get<CategoriesResponseBody>(endpoint);
  }
}
