import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { productMock, errorMock, productsMock } from '@shared/mocks/tests';
import { getProduct } from '../selectors/product-view.selectors';
import * as productsSelectors from '../selectors/products.selectors';
import {
  getError,
  getProductById,
  getProducts,
  isLoading,
} from '../selectors/products.selectors';
import { ProductsFacade } from './products.facade';
import { of } from 'rxjs';
import { createSelector } from '@ngrx/store';
import { ProductsSorts } from '@shared/interfaces/backend/product/ProductsRequest';
import {
  onInitProducts,
  onInitProductsByCategory,
} from '../actions/products.actions';

describe('Product View Facade', () => {
  let productsFacade: ProductsFacade;
  let store: MockStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        ProductsFacade,
        provideMockStore({
          initialState: {
            products: {
              entity: productsMock,
              loading: false,
              error: undefined,
            },
          },
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
    productsFacade = TestBed.inject(ProductsFacade);
  });

  it('isLoading$() should return isLoading selector', done => {
    const selectSpy = jest.spyOn(store, 'select');
    productsFacade.isLoading$().subscribe(loading => {
      expect(loading).toBe(false);
      done();
    });
    const expectedReturn = store.select(isLoading);

    expect(selectSpy).toHaveBeenCalled();
    expect(selectSpy).toHaveReturnedWith(expectedReturn);
  });

  it('getProducts$() should return getProducts selector', done => {
    const selectSpy = jest.spyOn(store, 'select');
    productsFacade.getProducts$().subscribe(products => {
      expect(products).toEqual(productsMock);
      done();
    });
    const expectedReturn = store.select(getProducts);

    expect(selectSpy).toHaveBeenCalled();
    expect(selectSpy).toHaveReturnedWith(expectedReturn);
  });

  it('getError$() should return getProduct selector', done => {
    const selectSpy = jest.spyOn(store, 'select');
    productsFacade.getError$().subscribe(error => {
      expect(error).toEqual(errorMock);
      done();
    });
    const expectedReturn = store.select(getError);

    expect(selectSpy).toHaveBeenCalled();
    expect(selectSpy).toHaveReturnedWith(expectedReturn);
  });

  it('findProductsByWord$() should return product filtered by word', done => {
    const selectSpy = jest.spyOn(store, 'select');
    const word = 'Fjallraven';
    productsFacade.findProductsByWord$(word).subscribe(product => {
      expect(product).toEqual([productsMock[0]]);
      done();
    });
    const expectedReturn = store.select(getProducts);

    expect(selectSpy).toHaveBeenCalled();
    expect(selectSpy).toHaveReturnedWith(expectedReturn);
  });

  it('findProductById$() should return product filtered by id', done => {
    const byIdSpy = jest
      .spyOn(productsSelectors, 'getProductById')
      .mockReturnValue(
        createSelector(
          v => v,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          () => productsMock[0] as any
        )
      );

    const byId$ = productsFacade.findProductById$(1);

    byId$.subscribe(product => {
      expect(product).toEqual(productsMock[0]);
      done();
    });

    expect(byIdSpy).toHaveBeenCalledWith(1);
  });

  it('getProductsByCategory$() should return product filtered by category', done => {
    const category = "men's clothing";
    const byCatSpy = jest
      .spyOn(productsSelectors, 'getProductByCategory')
      .mockReturnValue(
        createSelector(
          v => v,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          () => productsMock as any
        )
      );

    const byCat$ = productsFacade.getProductsByCategory$(category);

    byCat$.subscribe(products => {
      expect(products).toEqual(productsMock);
      done();
    });

    expect(byCatSpy).toHaveBeenCalledWith(category);
  });

  it('getProducts$() should dispatch onInitProducts with parameters', () => {
    const dispatchSpy = jest.spyOn(store, 'dispatch');

    const productParams = {
      limit: 1,
      sort: ProductsSorts.DESC,
    };

    productsFacade.getProducts(productParams);
    const expected = onInitProducts({ productParams });
    expect(dispatchSpy).toHaveBeenCalledWith(expected);
  });

  it('getProductsByCategory$() should dispatch onInitProductsByCategory with parameters', () => {
    const dispatchSpy = jest.spyOn(store, 'dispatch');

    const category = "men's clothing";

    const productParams = {
      limit: 1,
      sort: ProductsSorts.DESC,
    };

    productsFacade.getProductsByCategory(category, productParams);
    const expected = onInitProductsByCategory({ category, productParams });
    expect(dispatchSpy).toHaveBeenCalledWith(expected);
  });
});
