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

const usersMock = [
  {
    address: {
      geolocation: { lat: '-37.3159', long: '81.1496' },
      city: 'kilcoole',
      street: 'new road',
      number: 7682,
      zipcode: '12926-3874',
    },
    id: 1,
    email: 'john@gmail.com',
    username: 'johnd',
    password: 'm38rmF$',
    name: { firstname: 'john', lastname: 'doe' },
    phone: '1-570-236-7033',
    __v: 0,
  },
  {
    address: {
      geolocation: { lat: '-37.3159', long: '81.1496' },
      city: 'kilcoole',
      street: 'Lovers Ln',
      number: 7267,
      zipcode: '12926-3874',
    },
    id: 2,
    email: 'morrison@gmail.com',
    username: 'mor_2314',
    password: '83r5^_',
    name: { firstname: 'david', lastname: 'morrison' },
    phone: '1-570-236-7033',
    __v: 0,
  },
  {
    address: {
      geolocation: { lat: '40.3467', long: '-30.1310' },
      city: 'Cullman',
      street: 'Frances Ct',
      number: 86,
      zipcode: '29567-1452',
    },
    id: 3,
    email: 'kevin@gmail.com',
    username: 'kevinryan',
    password: 'kev02937@',
    name: { firstname: 'kevin', lastname: 'ryan' },
    phone: '1-567-094-1345',
    __v: 0,
  },
];

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
    const expectedUrl =
      'https://fakestoreapi.com/users/?limit=3&sort=desc';
    const req = httpTestingController.expectOne(expectedUrl);
    expect(req.request.method).toEqual('GET');

    req.flush(usersMock);
  });

  it('should return an observable with one user', () => {
    const user: Observable<UserResponse> = service.getUser(1);
    user.subscribe(users => expect(users).toEqual(usersMock[0]));
    const expectedUrl = 'https://fakestoreapi.com/users/1';
    const req = httpTestingController.expectOne(expectedUrl);
    expect(req.request.method).toEqual('GET');
    req.flush(usersMock[0]);
  });

  it('should update an user and return an observable with updated user', () => {
    const user: Observable<UserResponse> = service.updateUser(
      usersMock[0]
    );
    user.subscribe(users => expect(users).toEqual(usersMock[0]));
    const expectedUrl = 'https://fakestoreapi.com/users/1';
    const req = httpTestingController.expectOne(expectedUrl);
    expect(req.request.method).toEqual('PATCH');
    req.flush(usersMock[0]);
  });
});
