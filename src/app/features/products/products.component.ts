import { Component, DestroyRef, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsFacade } from '@app/store/products';
import { Product } from '@shared/interfaces/products/Product';
import { Observable } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ProductPreviewComponent } from '@shared/components/product-preview/product-preview.component';
import { CommonModule } from '@angular/common';
import { DirectivesModule } from '@shared/directives/directives.module';
import {
  ProductsParameters,
  ProductsSorts,
} from '@shared/interfaces/backend/product/ProductsRequest';
import { LoadingOverlayComponent } from '@shared/components/loading-overlay/loading-overlay.component';
import { ProductsFiltersComponent } from './components/products-filters/products-filters.component';
import { BaseLayoutComponent } from '@shared/components/base-layout/base-layout.component';
import { Paginated } from '@shared/interfaces/products/Paginated';

interface ProductsQueryParams {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    CommonModule,
    ProductPreviewComponent,
    DirectivesModule,
    LoadingOverlayComponent,
    ProductsFiltersComponent,
    BaseLayoutComponent,
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent {
  private destroyRef = inject(DestroyRef);

  isLoading$ = this.productsFacade.isLoading$();
  products$!: Observable<Paginated<Product>>;
  categoryId!: number;

  productsParams: ProductsParameters = {
    limit: 0,
    sort: ProductsSorts.DESC,
  };

  constructor(
    private productsFacade: ProductsFacade,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.initProducts();
  }

  private initProducts(): void {
    this.route.queryParams
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(this.onParamsChange.bind(this));
  }

  private onParamsChange(queryParams: ProductsQueryParams): void {
    const { category } = queryParams;
    this.categoryId = category;
    this.products$ = this.productsFacade.getProducts$();
    this.getProducts();
  }

  onFiltersChange(filters: ProductsParameters): void {
    this.productsParams = filters;
    this.getProducts();
  }

  getProducts(): void {
    if (this.categoryId) {
      this.productsFacade.getProductsByCategory(
        this.categoryId,
        this.productsParams
      );
      return;
    }

    this.productsFacade.getProducts(this.productsParams);
  }
}
