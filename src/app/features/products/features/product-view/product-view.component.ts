import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '@shared/interfaces/products/Product';
import { RedZoomModule } from 'ngx-red-zoom';
import { StarsComponent } from '@shared/components/stars/stars.component';
import { Observable } from 'rxjs';
import { ProductsFacade } from '@app/store/products';
import { CommonModule } from '@angular/common';
import { DirectivesModule } from '@shared/directives/directives.module';

@Component({
  selector: 'app-product-view',
  standalone: true,
  imports: [CommonModule, RedZoomModule, StarsComponent, DirectivesModule],
  providers: [],
  templateUrl: './product-view.component.html',
  styleUrl: './product-view.component.scss',
})
export class ProductViewComponent {
  product!: Observable<Product | undefined>;

  constructor(
    private route: ActivatedRoute,
    private productsFacade: ProductsFacade
  ) {
    const productId = Number(this.route.snapshot.paramMap.get('id'));
    this.product = this.productsFacade.findProductById$(productId);
  }
}
