import { ChangeDetectionStrategy, Component, Signal, inject } from '@angular/core';
import { LandingFeaturedStore } from './store/landing-featured.store';
import { LandingFeaturedProductComponent } from '../landing-featured-product/landing-featured-product.component';

@Component({
  selector: 'app-landing-featured',
  standalone: true,
  imports: [LandingFeaturedProductComponent],
  templateUrl: './landing-featured.component.html',
  styleUrl: './landing-featured.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LandingFeaturedComponent {
  readonly store = inject(LandingFeaturedStore)
}
