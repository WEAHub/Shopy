import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { StarsComponent } from '@shared/components/stars/stars.component';
import { Product } from '@shared/interfaces/products/Product';

@Component({
  selector: 'app-product-view-comments',
  standalone: true,
  imports: [StarsComponent, CommonModule],
  templateUrl: './product-view-comments.component.html',
  styleUrl: './product-view-comments.component.scss',
})
export class ProductViewCommentsComponent {
  @Input() product!: Product;
}
