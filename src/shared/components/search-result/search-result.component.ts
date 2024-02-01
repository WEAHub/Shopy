import { Component, Input } from '@angular/core';
import { DirectivesModule } from '@shared/directives/directives.module';
import { Product } from '@shared/interfaces/products/Product';

@Component({
  selector: 'app-search-result',
  standalone: true,
  imports: [DirectivesModule],
  templateUrl: './search-result.component.html',
  styleUrl: './search-result.component.scss',
})
export class SearchResultComponent {
  @Input() product!: Product;
}
