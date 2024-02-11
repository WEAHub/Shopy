import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ProductsFeaturedFacade } from '@app/store/products';
import { ProductPreviewComponent } from '@shared/components/product-preview/product-preview.component';
import { DirectivesModule } from '@shared/directives/directives.module';
import { Products } from '@shared/interfaces/products/Product';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-products-featured',
  standalone: true,
  imports: [ProductPreviewComponent, DirectivesModule, CommonModule],
  templateUrl: './products-featured.component.html',
  styleUrl: './products-featured.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsFeaturedComponent {
  products: Observable<Products | undefined> =
    this.productsFacade.getProducts$();
  loading: Observable<boolean> = this.productsFacade.isLoading$();
  constructor(private productsFacade: ProductsFeaturedFacade) {}
}
