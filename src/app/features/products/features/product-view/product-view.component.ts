import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '@shared/interfaces/products/Product';
import { RedZoomModule } from 'ngx-red-zoom';
import { StarsComponent } from '@shared/components/stars/stars.component';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { DirectivesModule } from '@shared/directives/directives.module';
import { ProductViewSendComponent } from '../product-view-send/product-view-send.component';
import { LandingFeaturedComponent } from '@app/features/landing/components/landing-featured/landing-featured.component';
import { ProductViewFacade } from '@app/store/products/facades/products-view.facade';

@Component({
  selector: 'app-product-view',
  standalone: true,
  imports: [
    CommonModule,
    RedZoomModule,
    StarsComponent,
    DirectivesModule,
    ProductViewSendComponent,
    LandingFeaturedComponent,
  ],
  providers: [],
  templateUrl: './product-view.component.html',
  styleUrl: './product-view.component.scss',
})
export class ProductViewComponent {
  product!: Observable<Product | undefined>;

  constructor(
    private route: ActivatedRoute,
    private productViewFacade: ProductViewFacade
  ) {
    const productId = Number(this.route.snapshot.paramMap.get('id'));
    this.product = this.productViewFacade.getProduct$(productId);
  }
}
