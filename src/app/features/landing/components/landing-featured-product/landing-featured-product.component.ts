import { Component, Input } from '@angular/core';
import { StarsComponent } from '@shared/components/stars/stars.component';
import { Product } from '@shared/interfaces/products/Product';
import { PrimeNGModule } from '@shared/modules/primeng/primeng.module';

@Component({
  selector: 'app-landing-featured-product',
  standalone: true,
  imports: [
    StarsComponent,
    PrimeNGModule
  ],
  templateUrl: './landing-featured-product.component.html',
  styleUrl: './landing-featured-product.component.scss'
})
export class LandingFeaturedProductComponent {
  @Input() product!: Product
}
