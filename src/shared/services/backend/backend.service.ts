import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { Endpoints } from '@interfaces/backend/endpoints';

@Injectable({
  providedIn: 'root',
})
export class BackendService {
  private baseUrl = environment.apiURL;
  private endPoints: Endpoints = environment.apiEndpoints;

  generateUrl(
    key: string,
    params: object = {},
    subPaths: string[] = []
  ): string {
    let endPoint: string = `${this.baseUrl}/${this.endPoints[key]}`;
    const queryParamsLen = Object.keys(params).length;

    if (subPaths.length) {
      endPoint += subPaths.join('/');
    }

    if (queryParamsLen) {
      const queryParams = Object.entries(params)
        .map(pair => pair.map(encodeURIComponent).join('='))
        .join('&');

      endPoint += `?${queryParams}`;
    }

    return endPoint;
  }
}
