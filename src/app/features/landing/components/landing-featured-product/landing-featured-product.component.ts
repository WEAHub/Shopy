import { Component, Input } from '@angular/core';
import { Product } from '@shared/interfaces/products/Product';

@Component({
  selector: 'app-landing-featured-product',
  standalone: true,
  imports: [],
  templateUrl: './landing-featured-product.component.html',
  styleUrl: './landing-featured-product.component.scss'
})
export class LandingFeaturedProductComponent {
  @Input() product!: Product
}
