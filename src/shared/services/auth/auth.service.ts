import { Injectable } from '@angular/core';
import { BackendService } from '../backend/backend.service';
import { LoginRequestBody } from '@interfaces/backend/login/LoginRequest';
import { Observable } from 'rxjs';
import { LoginResponseBody } from '@interfaces/backend/login/LoginResponse';
import { HttpClient } from '@angular/common/http';
import { LoginEndpoints } from '@interfaces/backend/login';

@Injectable()
export class AuthService {
  constructor(
    private backendService: BackendService,
    private httpClient: HttpClient
  ) {}

  public login(loginData: LoginRequestBody): Observable<LoginResponseBody> {
    const endpoint = this.backendService.generateUrl(LoginEndpoints.LOGIN)
    return this.httpClient.post<LoginResponseBody>(endpoint, loginData);
  }

}