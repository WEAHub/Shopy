import { Component, DestroyRef, inject } from '@angular/core';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { Product } from '@shared/interfaces/products/Product';
import { RedZoomModule } from 'ngx-red-zoom';
import { StarsComponent } from '@shared/components/stars/stars.component';
import { Observable, filter } from 'rxjs';
import { CommonModule } from '@angular/common';
import { DirectivesModule } from '@shared/directives/directives.module';
import { ProductViewSendComponent } from '../product-view-send/product-view-send.component';
import { LandingFeaturedComponent } from '@app/features/landing/components/landing-featured/landing-featured.component';
import { ProductViewFacade } from '@app/store/products/facades/products-view.facade';
import { LoadingOverlayComponent } from '@shared/components/loading-overlay/loading-overlay.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

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
    LoadingOverlayComponent,
  ],
  providers: [],
  templateUrl: './product-view.component.html',
  styleUrl: './product-view.component.scss',
})
export class ProductViewComponent {
  private destroyRef = inject(DestroyRef);
  product$: Observable<Product | undefined> =
    this.productViewFacade.getProduct$();
  productLoading$: Observable<boolean> = this.productViewFacade.isLoading$();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productViewFacade: ProductViewFacade
  ) {
    this.initProduct();
    this.router.events
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        filter(event => event instanceof NavigationStart)
      )
      .subscribe(this.initProduct.bind(this));
  }

  private initProduct(): void {
    const productId = Number(this.route.snapshot.paramMap.get('id'));
    this.productViewFacade.getProduct(productId);
  }
}
