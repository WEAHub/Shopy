import { NgOptimizedImage } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { StarsComponent } from '@shared/components/stars/stars.component';
import { DirectivesModule } from '@shared/directives/directives.module';
import { Product } from '@shared/interfaces/products/Product';
import { PrimeNGModule } from '@shared/modules/primeng/primeng.module';

@Component({
  selector: 'app-product-preview',
  standalone: true,
  imports: [
    StarsComponent,
    PrimeNGModule,
    DirectivesModule,
    NgOptimizedImage,
  ],
  templateUrl: './product-preview.component.html',
  styleUrl: './product-preview.component.scss',
})
export class ProductPreviewComponent {
  @Input() product!: Product;
  constructor(private router: Router) {}
}
