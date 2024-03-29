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
import { productMock, errorMock } from '@shared/mocks/tests';
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
