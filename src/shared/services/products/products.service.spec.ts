import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ProductsService } from './products.service';
import {
  ProductResponseBody,
  ProductsResponseBody,
} from '@shared/interfaces/backend/product/ProductsResponse';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';

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

const productsByCategoryMock = [
  {
    id: 5,
    title:
      "John Hardy Women's Legends Naga Gold & Silver Dragon Station Chain Bracelet",
    price: 695,
    description:
      "From our Legends Collection, the Naga was inspired by the mythical water dragon that protects the ocean's pearl. Wear facing inward to be bestowed with love and abundance, or outward for protection.",
    category: 'jewelery',
    image:
      'https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg',
    rating: { rate: 4.6, count: 400 },
  },
];

describe('Products Service', () => {
  let service: ProductsService;
  let httpTestingController: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductsService],
    });
    service = TestBed.inject(ProductsService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should return an observable products filtered by category', () => {
    const products: Observable<ProductsResponseBody> =
      service.getProductsByCategory('jewelery');

    products.subscribe(_products =>
      expect(_products).toEqual(productsByCategoryMock)
    );
    const expectedUrl = environment.apiURL + '/products/category/jewelery';
    const req = httpTestingController.expectOne(expectedUrl);
    expect(req.request.method).toEqual('GET');

    req.flush(productsByCategoryMock);
  });

  it('should return an observable with 1 product', () => {
    const product: Observable<ProductResponseBody> = service.getProduct(1);

    product.subscribe(_product => expect(_product).toEqual(productMock));
    const expectedUrl = environment.apiURL + '/products/1';
    const req = httpTestingController.expectOne(expectedUrl);
    expect(req.request.method).toEqual('GET');

    req.flush(productMock);
  });
});
