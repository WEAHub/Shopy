import { TestBed } from '@angular/core/testing';
import { UserService } from './user.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { Observable } from 'rxjs';
import {
  AllUsersResponse,
  UserResponse,
} from '@shared/interfaces/backend/users/UsersResponse';
import { UsersSorts } from '@shared/interfaces/backend/users/UsersRequest';
import { environment } from '@environments/environment.base';
import { usersMock } from '@shared/mocks/tests';

describe('User Service', () => {
  let service: UserService;
  let httpTestingController: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService],
    });
    service = TestBed.inject(UserService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should return an observable with users', () => {
    const users: Observable<AllUsersResponse> = service.getUsers({
      limit: 3,
      sort: UsersSorts.DESC,
    });

    users.subscribe(users => expect(users).toEqual(usersMock));
    const expectedUrl = environment.apiURL + '/users/?limit=3&sort=desc';
    const req = httpTestingController.expectOne(expectedUrl);
    expect(req.request.method).toEqual('GET');

    req.flush(usersMock);
  });

  it('should return an observable with one user', () => {
    const user: Observable<UserResponse> = service.getUser(1);
    user.subscribe(users => expect(users).toEqual(usersMock[0]));
    const expectedUrl = environment.apiURL + '/users/1';
    const req = httpTestingController.expectOne(expectedUrl);
    expect(req.request.method).toEqual('GET');
    req.flush(usersMock[0]);
  });

  it('should update an user and return an observable with updated user', () => {
    const user: Observable<UserResponse> = service.updateUser(
      usersMock[0]
    );
    user.subscribe(users => expect(users).toEqual(usersMock[0]));
    const expectedUrl = environment.apiURL + '/users/1';
    const req = httpTestingController.expectOne(expectedUrl);
    expect(req.request.method).toEqual('PATCH');
    req.flush(usersMock[0]);
  });
});
