import { Component, Input } from '@angular/core';
import { Product } from '@shared/interfaces/products/Product';

@Component({
  selector: 'app-search-result',
  standalone: true,
  imports: [],
  templateUrl: './search-result.component.html',
  styleUrl: './search-result.component.scss',
})
export class SearchResultComponent {
  @Input() product!: Product;
}
