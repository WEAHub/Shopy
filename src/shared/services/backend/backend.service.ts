import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment'
import { Endpoints } from '@interfaces/backend/endpoints';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  private baseUrl = environment.apiURL
  private endPoints: Endpoints = environment.apiEndpoints

  generateUrl(key: string, params: object = {}): string {
    let endPoint: string = `${this.baseUrl}/${this.endPoints[key]}`;
    const queryParamsLen = Object.keys(params).length;

    if(queryParamsLen) {
      const queryParams = Object.entries(params)
        .map(pair => pair.map(encodeURIComponent).join('='))
        .join('&');
      
      endPoint += `?${queryParams}`
    }

    return endPoint
  }

}
