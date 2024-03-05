import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { StarsComponent } from '@shared/components/stars/stars.component';
import { DirectivesModule } from '@shared/directives/directives.module';
import { Product } from '@shared/interfaces/products/Product';
import { PrimeNGModule } from '@shared/modules/primeng/primeng.module';
import { ImageComponent } from '../image/image.component';
import { StockProgressBarComponent } from '../stock-progress-bar/stock-progress-bar.component';

@Component({
  selector: 'app-product-preview',
  standalone: true,
  imports: [
    StarsComponent,
    PrimeNGModule,
    DirectivesModule,
    ImageComponent,
    StockProgressBarComponent,
  ],
  templateUrl: './product-preview.component.html',
  styleUrl: './product-preview.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductPreviewComponent {
  @Input() product!: Product;
}
