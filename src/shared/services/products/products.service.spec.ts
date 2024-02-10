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
import { productsByCategoryMock, productMock } from '@shared/mocks/tests';

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
