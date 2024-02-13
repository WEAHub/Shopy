import { errorMock, productsMock } from '@shared/mocks/tests';
import {
  getError,
  getProducts,
  isLoading,
} from '../selectors/products-featured.selectors';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { ProductsFeaturedFacade } from './products-featured.facade';

describe('Product View Facade', () => {
  let productFeaturedFacade: ProductsFeaturedFacade;
  let store: MockStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        ProductsFeaturedFacade,
        provideMockStore({
          selectors: [
            {
              selector: isLoading,
              value: false,
            },
            {
              selector: getProducts,
              value: productsMock,
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
    productFeaturedFacade = TestBed.inject(ProductsFeaturedFacade);
  });

  it('isLoading$() should return isLoading selector', done => {
    const selectSpy = jest.spyOn(store, 'select');
    productFeaturedFacade.isLoading$().subscribe(loading => {
      expect(loading).toBe(false);
      done();
    });
    const expectedReturn = store.select(isLoading);

    expect(selectSpy).toHaveBeenCalled();
    expect(selectSpy).toHaveReturnedWith(expectedReturn);
  });

  it('getProducts$() should return getProducts selector', done => {
    const selectSpy = jest.spyOn(store, 'select');
    productFeaturedFacade.getProducts$().subscribe(products => {
      expect(products).toEqual(productsMock);
      done();
    });
    const expectedReturn = store.select(getProducts);

    expect(selectSpy).toHaveBeenCalled();
    expect(selectSpy).toHaveReturnedWith(expectedReturn);
  });

  it('getError$() should return getProduct selector', done => {
    const selectSpy = jest.spyOn(store, 'select');
    productFeaturedFacade.getError$().subscribe(error => {
      expect(error).toEqual(errorMock);
      done();
    });
    const expectedReturn = store.select(getError);

    expect(selectSpy).toHaveBeenCalled();
    expect(selectSpy).toHaveReturnedWith(expectedReturn);
  });
});
