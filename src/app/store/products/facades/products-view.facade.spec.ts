/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { ProductViewFacade } from './products-view.facade';
import {
  isLoading,
  getProduct,
  getError,
} from '../selectors/product-view.selectors';
import { onInitProductsView } from '../actions/products-view.actions';
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

describe('Product View Facade', () => {
  let productViewFacade: ProductViewFacade;
  let store: MockStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        ProductViewFacade,
        provideMockStore({
          selectors: [
            {
              selector: isLoading,
              value: false,
            },
            {
              selector: getProduct,
              value: productMock,
            },
            {
              selector: getError,
              value: errorMock,
            },
          ],
        }),
        MockStore,
      ],
    });
    store = TestBed.inject(MockStore);
    productViewFacade = TestBed.inject(ProductViewFacade);
  });

  it('isLoading$() should return isLoading selector', done => {
    const selectSpy = jest.spyOn(store, 'select');
    productViewFacade.isLoading$().subscribe(loading => {
      expect(loading).toBe(false);
      done();
    });
    const expectedReturn = store.select(isLoading);

    expect(selectSpy).toHaveBeenCalled();
    expect(selectSpy).toHaveReturnedWith(expectedReturn);
  });

  it('getProduct$() should return getProduct selector', done => {
    const selectSpy = jest.spyOn(store, 'select');
    productViewFacade.getProduct$().subscribe(product => {
      expect(product).toEqual(productMock);
      done();
    });
    const expectedReturn = store.select(getProduct);

    expect(selectSpy).toHaveBeenCalled();
    expect(selectSpy).toHaveReturnedWith(expectedReturn);
  });

  it('getError$() should return getProduct selector', done => {
    const selectSpy = jest.spyOn(store, 'select');
    productViewFacade.getError$().subscribe(error => {
      expect(error).toEqual(errorMock);
      done();
    });
    const expectedReturn = store.select(getError);

    expect(selectSpy).toHaveBeenCalled();
    expect(selectSpy).toHaveReturnedWith(expectedReturn);
  });

  it('getProduct$() should return getProduct selector', () => {
    const dispatchSpy = jest.spyOn(store, 'dispatch');
    productViewFacade.getProduct(1);
    const expectedAction = onInitProductsView({ id: productMock.id });
    expect(dispatchSpy).toHaveBeenCalledWith(expectedAction);
  });
});
