import { Component, DestroyRef, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsFacade } from '@app/store/products';
import { Products } from '@shared/interfaces/products/Product';
import { Observable } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ProductPreviewComponent } from '@shared/components/product-preview/product-preview.component';
import { CommonModule } from '@angular/common';
import { DirectivesModule } from '@shared/directives/directives.module';

interface ProductsQueryParams {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, ProductPreviewComponent, DirectivesModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent {
  private destroyRef = inject(DestroyRef);

  isLoading$ = this.productsFacade.isLoading$();
  products$!: Observable<Products>;
  category!: string;

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
    this.category = category;
    this.products$ = this.category
      ? this.productsFacade.getProductsByCategory$(this.category)
      : this.productsFacade.getProducts$();
  }
}
