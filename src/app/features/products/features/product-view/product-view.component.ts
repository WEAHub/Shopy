import {
  AfterViewInit,
  Component,
  DestroyRef,
  Inject,
  OnInit,
  inject,
} from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Product } from '@shared/interfaces/products/Product';
import { RedZoomModule } from 'ngx-red-zoom';
import { StarsComponent } from '@shared/components/stars/stars.component';
import { Observable, filter, tap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { DirectivesModule } from '@shared/directives/directives.module';
import { ProductViewSendComponent } from '../product-view-send/product-view-send.component';
import { LandingFeaturedComponent } from '@app/features/landing/components/landing-featured/landing-featured.component';
import { ProductViewFacade } from '@app/store/products/facades/products-view.facade';
import { LoadingOverlayComponent } from '@shared/components/loading-overlay/loading-overlay.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MetadataService } from '@shared/services/metadata/metadata.service';

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
  providers: [MetadataService],
  templateUrl: './product-view.component.html',
  styleUrl: './product-view.component.scss',
})
export class ProductViewComponent implements AfterViewInit, OnInit {
  private destroyRef = inject(DestroyRef);
  product$: Observable<Product> = this.productViewFacade
    .getProduct$()
    .pipe(tap(this.addMetaTags.bind(this)));
  productLoading$: Observable<boolean> = this.productViewFacade.isLoading$();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productViewFacade: ProductViewFacade,
    private metadataService: MetadataService
  ) {}

  ngOnInit(): void {
    this.initProduct();
  }

  ngAfterViewInit(): void {
    this.router.events
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        filter(event => event instanceof NavigationEnd)
      )
      .subscribe(() => this.initProduct());
  }

  private initProduct(): void {
    const productId = Number(this.route.snapshot.paramMap.get('id'));
    this.productViewFacade.getProduct(productId);
  }

  private addMetaTags(product: Product): void {
    if (!product) return;
    this.metadataService.updateMetadata({
      title: product?.title,
      description: product?.description,
      keywords: this.metadataService.extractWords([
        product?.title,
        product?.description,
      ]),
    });
  }
}
