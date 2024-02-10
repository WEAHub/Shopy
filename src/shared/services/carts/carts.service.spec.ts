import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { Observable, of } from 'rxjs';
import { CartsService } from './carts.service';
import { AuthFacade } from '@app/store/auth';
import { provideMockStore } from '@ngrx/store/testing';
import { CartsSorts } from '@shared/interfaces/backend/cart/CartRequest';
import { CartsResponse } from '@shared/interfaces/backend/cart/CartResponse';
import { CartsServiceModule } from './carts.service.module';
import { Cart } from '@shared/interfaces/carts/Cart';
import { environment } from '@environments/environment.base';
import { cartMock, cartsMock, userMock } from '@shared/mocks/tests';

describe('Carts Service', () => {
  let service: CartsService;
  let authFacade: AuthFacade;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, CartsServiceModule],
      providers: [AuthFacade, provideMockStore({})],
    });
    service = TestBed.inject(CartsService);
    authFacade = TestBed.inject(AuthFacade);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should return an observable with 2 carts', () => {
    const carts: Observable<CartsResponse> = service.getCarts({
      limit: 2,
      sort: CartsSorts.DESC,
    });

    carts.subscribe(_carts => expect(_carts).toEqual(cartsMock));

    const expectedUrl = environment.apiURL + '/carts/?limit=2&sort=desc';

    const req = httpTestingController.expectOne(expectedUrl);
    expect(req.request.method).toEqual('GET');

    req.flush(cartsMock);
  });

  it('should return an observable with 1 cart', () => {
    const authSpy = jest
      .spyOn(authFacade, 'isAuthenticated$')
      .mockReturnValue(of(true));

    const userSpy = jest
      .spyOn(authFacade, 'getUser$')
      .mockReturnValue(of(userMock));

    const users: Observable<Cart> = service.getCart();

    expect(authSpy).toHaveBeenCalled();
    users.subscribe(users => expect(users).toEqual(cartMock));
    expect(userSpy).toHaveBeenCalled();

    const expectedUrl = environment.apiURL + '/carts/1';
    const req = httpTestingController.expectOne(expectedUrl);

    expect(req.request.method).toEqual('GET');
    req.flush(cartMock);
  });

  it('should update cart and return an observable with updated cart', () => {
    const cart: Observable<Cart> = service.updateCart(cartMock);
    cart.subscribe(_cart => expect(_cart).toEqual(cartMock));
    const expectedUrl = environment.apiURL + '/carts/1';
    const req = httpTestingController.expectOne(expectedUrl);
    expect(req.request.method).toEqual('PATCH');
    req.flush(cartMock);
  });
});
