import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BackendService } from '../backend/backend.service';
import { AllUsersResponse, UserResponse } from '@shared/interfaces/backend/users/UsersResponse';
import { UsersEndpoints } from '@shared/interfaces/backend/users';
import { UsersParameters } from '@shared/interfaces/backend/users/UsersRequest';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(
    private backendService: BackendService,
    private httpClient: HttpClient
  ) {}

  public getUsers(options: UsersParameters): Observable<AllUsersResponse> {
    const endpoint = this.backendService.generateUrl(
      UsersEndpoints.GET_USERS, 
      options
    )

    return this.httpClient.get<AllUsersResponse>(endpoint);
  }

  public getUser(id: number): Observable<UserResponse> {
    const endpoint = this.backendService.generateUrl(UsersEndpoints.GET_USERS) + `/${id}`
    return this.httpClient.get<UserResponse>(endpoint);
  }
}
