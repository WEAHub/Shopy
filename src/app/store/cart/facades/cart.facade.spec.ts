import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { cartMock, errorMock } from '@shared/mocks/tests';
import {
  isLoading,
  getError,
  getCart,
  getCartProducts,
  getCartProductsCount,
  getCartTotalPrice,
} from '../selectors/cart.selectors';
import { CartFacade } from './cart.facade';
import { Cart } from '@shared/interfaces/carts/Cart';
import { onCartUpdate } from '../actions/cart.actions';

describe('Product View Facade', () => {
  let cartFacade: CartFacade;
  let store: MockStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        CartFacade,
        provideMockStore({
          selectors: [
            {
              selector: isLoading,
              value: false,
            },
            {
              selector: getError,
              value: errorMock,
            },
            {
              selector: getCart,
              value: cartMock,
            },
            {
              selector: getCartProductsCount,
              value: 3,
            },
            {
              selector: getCartProducts,
              value: cartMock.products,
            },
            {
              selector: getCartTotalPrice,
              value: 200,
            },
          ],
        }),
        MockStore,
      ],
    });
    store = TestBed.inject(MockStore);
    cartFacade = TestBed.inject(CartFacade);
  });

  it('isLoading$() should return isLoading selector', done => {
    const selectSpy = jest.spyOn(store, 'select');
    cartFacade.isLoading$().subscribe(loading => {
      expect(loading).toBe(false);
      done();
    });
    const expectedReturn = store.select(isLoading);

    expect(selectSpy).toHaveBeenCalled();
    expect(selectSpy).toHaveReturnedWith(expectedReturn);
  });

  it('getCart$() should return getCart selector', done => {
    const selectSpy = jest.spyOn(store, 'select');
    cartFacade.getCart$().subscribe(cart => {
      expect(cart).toBe(cartMock);
      done();
    });
    const expectedReturn = store.select(getCart);

    expect(selectSpy).toHaveBeenCalled();
    expect(selectSpy).toHaveReturnedWith(expectedReturn);
  });

  it('getCartProductsCount$() should return getCartProductsCount selector', done => {
    const selectSpy = jest.spyOn(store, 'select');
    cartFacade.getCartProductsCount$().subscribe(count => {
      expect(count).toBe(3);
      done();
    });
    const expectedReturn = store.select(getCartProductsCount);

    expect(selectSpy).toHaveBeenCalled();
    expect(selectSpy).toHaveReturnedWith(expectedReturn);
  });

  it('getCartProducts$() should return getCartProducts selector', done => {
    const selectSpy = jest.spyOn(store, 'select');
    cartFacade.getCartProducts$().subscribe(products => {
      expect(products).toBe(cartMock.products);
      done();
    });
    const expectedReturn = store.select(getCartProducts);

    expect(selectSpy).toHaveBeenCalled();
    expect(selectSpy).toHaveReturnedWith(expectedReturn);
  });

  it('getCartTotalPrice$() should return getCartTotalPrice selector', done => {
    const selectSpy = jest.spyOn(store, 'select');
    cartFacade.getCartTotalPrice$().subscribe(price => {
      expect(price).toBe(200);
      done();
    });
    const expectedReturn = store.select(getCartTotalPrice);

    expect(selectSpy).toHaveBeenCalled();
    expect(selectSpy).toHaveReturnedWith(expectedReturn);
  });

  it('updateCart should dispatch onCartUpdate and update the store', done => {
    const dispatchSpy = jest.spyOn(store, 'dispatch');

    const cart: Cart = { ...cartMock };
    cart.products[0].productId = 3;

    cartFacade.updateCart(cart);

    cartFacade.getCart$().subscribe(cart => {
      expect(cart).toEqual(cart);
      done();
    });

    expect(dispatchSpy).toHaveBeenCalledWith(onCartUpdate({ cart }));
  });

  it('deleteProduct should delete cart product by CartProduct ID', done => {
    const dispatchSpy = jest.spyOn(store, 'dispatch');

    const cart = { ...cartMock };
    const product = { ...cart.products[0] };
    cartFacade.deleteProduct(product);
    cart.products.splice(0, 1);

    cartFacade.getCart$().subscribe(_cart => {
      expect(_cart).toEqual(cart);
      done();
    });

    expect(dispatchSpy).toHaveBeenCalledWith(onCartUpdate({ cart }));
  });

  it('deleteProduct should not update cart store if product doesnt exists on cart', done => {
    const dispatchSpy = jest.spyOn(store, 'dispatch');

    const cart = { ...cartMock };
    const product = { ...cart.products[0], productId: 123 };
    cartFacade.deleteProduct(product);

    cartFacade.getCart$().subscribe(_cart => {
      expect(_cart).toEqual(cart);
      done();
    });

    expect(dispatchSpy).not.toHaveBeenCalled();
  });

  it('updateProduct should update cart product', done => {
    const dispatchSpy = jest.spyOn(store, 'dispatch');

    const cart = { ...cartMock };
    const product = { ...cart.products[0], quantity: 99 };
    cartFacade.updateProduct(product);

    cart.products[0] = product;

    cartFacade.getCart$().subscribe(_cart => {
      expect(_cart).toEqual(cart);
      done();
    });

    expect(dispatchSpy).toHaveBeenCalledWith(onCartUpdate({ cart }));
  });

  it('updateProduct should not update product because productId doesnt exists', done => {
    const dispatchSpy = jest.spyOn(store, 'dispatch');

    const cart = { ...cartMock };
    const product = {
      ...cart.products[0],
      quantity: 99,
      productId: 382910,
    };
    cartFacade.updateProduct(product);

    cartFacade.getCart$().subscribe(_cart => {
      expect(_cart).toEqual(cart);
      done();
    });

    expect(dispatchSpy).not.toHaveBeenCalledWith();
  });

  it('addProduct should update cart product quantity if exists', done => {
    const dispatchSpy = jest.spyOn(store, 'dispatch');

    const cart = { ...cartMock };
    const product = { ...cart.products[0], quantity: 1 };
    cartFacade.addProduct(product);

    cart.products[0] = {
      ...product,
      quantity: 100,
    };

    cartFacade.getCart$().subscribe(_cart => {
      expect(_cart).toEqual(cart);
      done();
    });

    expect(dispatchSpy).toHaveBeenCalledWith(onCartUpdate({ cart }));
  });

  it('addProduct should update cart with new product', done => {
    const dispatchSpy = jest.spyOn(store, 'dispatch');

    const cart = { ...cartMock };
    const product = { ...cart.products[0], quantity: 1, productId: 999 };
    cartFacade.addProduct(product);

    cart.products.push(product);
    cartFacade.getCart$().subscribe(_cart => {
      expect(_cart).toEqual(cart);
      done();
    });

    expect(dispatchSpy).toHaveBeenCalledWith(onCartUpdate({ cart }));
  });
});
