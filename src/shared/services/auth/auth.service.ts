import { Injectable } from '@angular/core';
import { BackendService } from '../backend/backend.service';
import { LoginRequestBody } from '@shared/interfaces/backend/auth/LoginRequest';
import { Observable } from 'rxjs';
import { LoginResponseBody } from '@shared/interfaces/backend/auth/LoginResponse';
import { HttpClient } from '@angular/common/http';
import { AuthEndpoints } from '@shared/interfaces/backend/auth';
import { UserTokens } from '@shared/interfaces/user/User';

@Injectable()
export class AuthService {
  constructor(
    private backendService: BackendService,
    private httpClient: HttpClient
  ) {}

  public login(
    loginData: LoginRequestBody
  ): Observable<LoginResponseBody> {
    const endpoint = this.backendService.generateUrl(AuthEndpoints.LOGIN);
    return this.httpClient.post<LoginResponseBody>(endpoint, loginData);
  }

  public refresh(refreshToken: string): Observable<UserTokens> {
    const endpoint = this.backendService.generateUrl(
      AuthEndpoints.REFRESH
    );
    return this.httpClient.get<UserTokens>(endpoint, {
      headers: {
        authorization: `Bearer ${refreshToken}`,
      },
    });
  }
}
