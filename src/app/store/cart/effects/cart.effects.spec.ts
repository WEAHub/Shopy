/* eslint-disable @typescript-eslint/no-explicit-any */
import { provideMockActions } from '@ngrx/effects/testing';
import { TestBed } from '@angular/core/testing';

import { CartEffects } from './cart.effects';
import { Observable, of, throwError } from 'rxjs';
import * as TypeMoq from 'typemoq';
import { Action, resultMemoize } from '@ngrx/store';
import { Actions } from '@ngrx/effects';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ProductsService } from '@shared/services/products/products.service';
import { CartsService } from '@shared/services/carts/carts.service';
import {
  onCartSuccess,
  onCartInit,
  onCartUpdateSuccess,
  onCartUpdate,
  onCartUpdateError,
} from '../actions/cart.actions';

const errorMock: any = {
  status: 401,
  statusText: 'Unknown Error',
  url: 'https://fakestoreapi.com/auth/login',
  ok: false,
  name: 'HttpErrorResponse',
  message:
    'Http failure response for https://fakestoreapi.com/auth/login: 401 ',
  error: {},
};

//35-38,50,63-69
const productMock = {
  id: 1,
  title: 'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops',
  price: 109.95,
  description:
    'Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday',
  category: "men's clothing",
  image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
  rating: { rate: 3.9, count: 120 },
};

const cartMock = {
  id: 1,
  userId: 1,
  date: new Date('2020-03-02T00:00:00.000Z'),
  products: [
    { productId: 1, quantity: 4 },
    { productId: 2, quantity: 1 },
    { productId: 3, quantity: 6 },
  ],
  __v: 0,
};

describe('AuthEffects', () => {
  let effects: CartEffects;
  let actions$ = new Observable<Action>();

  const mockCartService: TypeMoq.IMock<CartsService> =
    TypeMoq.Mock.ofType<CartsService>();

  const mockProductsService: TypeMoq.IMock<ProductsService> =
    TypeMoq.Mock.ofType<ProductsService>();

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        CartEffects,
        {
          provide: CartsService,
          useFactory: () => mockCartService.object,
        },
        {
          provide: ProductsService,
          useFactory: () => mockProductsService.object,
        },
        provideMockActions(() => actions$),
      ],
    });

    actions$ = TestBed.inject(Actions);
    effects = TestBed.inject(CartEffects);
  });

  afterEach(() => {
    mockProductsService.reset();
    mockCartService.reset();
  });

  it('aggregateProduct() should aggregate product details on each cart product', async () => {
    const aggregateSpy = jest.spyOn(effects, 'aggregateProduct');

    mockProductsService
      .setup(x => x.getProduct(1))
      .returns(() => of(productMock))
      .verifiable();

    mockProductsService
      .setup(x => x.getProduct(2))
      .returns(() => of(productMock))
      .verifiable();

    mockProductsService
      .setup(x => x.getProduct(3))
      .returns(() => of(productMock))
      .verifiable();

    const expected = cartMock.products.map(p => ({
      ...p,
      product: productMock,
    }));

    const result = await effects.aggregateProduct(cartMock.products);

    mockProductsService.verifyAll();
    expect(aggregateSpy).toHaveBeenCalledWith(cartMock.products);
    expect(result).toEqual(expected);
  });

  it('init$ should call getCart() and update cart store with products processed', async () => {
    mockCartService
      .setup(x => x.getCart())
      .returns(() => of(cartMock))
      .verifiable();

    const expectedAction = onCartSuccess({
      cart: cartMock,
    });

    actions$ = of(onCartInit());
    effects.init$.subscribe(x => expect(x).toEqual(expectedAction));

    mockCartService.verifyAll();
  });

  it('update$ should call updateCart() and update cart store with products processed', async () => {
    mockCartService
      .setup(x => x.updateCart(cartMock))
      .returns(() => of(cartMock))
      .verifiable();

    const expectedAction = onCartUpdateSuccess({
      cart: cartMock,
    });

    actions$ = of(onCartUpdate({ cart: cartMock }));
    effects.update$.subscribe(x => expect(x).toEqual(expectedAction));

    mockCartService.verifyAll();
  });

  it('update$ should call updateCart() and return an error', async () => {
    mockCartService
      .setup(x => x.updateCart(cartMock))
      .returns(() => throwError(() => errorMock))
      .verifiable();

    const expectedAction = onCartUpdateError({
      error: errorMock,
    });

    actions$ = of(onCartUpdate({ cart: cartMock }));
    effects.update$.subscribe(x => expect(x).toEqual(expectedAction));
    mockCartService.verifyAll();
  });
});
