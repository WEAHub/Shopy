import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ProductsFacade, ProductsFeaturedFacade } from '@app/store/products';
import { ProductPreviewComponent } from '@shared/components/product-preview/product-preview.component';
import { DirectivesModule } from '@shared/directives/directives.module';
import { Products } from '@shared/interfaces/products/Product';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-landing-featured',
  standalone: true,
  imports: [ProductPreviewComponent, DirectivesModule, CommonModule],
  templateUrl: './landing-featured.component.html',
  styleUrl: './landing-featured.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingFeaturedComponent {
  products: Observable<Products | undefined> =
    this.productsFacade.getProducts$();
  loading: Observable<boolean> = this.productsFacade.isLoading$();
  constructor(private productsFacade: ProductsFeaturedFacade) {}
}
