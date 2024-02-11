import { Component } from '@angular/core';
import { ProductsFeaturedComponent } from '../../../shared/components/products-featured/products-featured.component';
import { LandingHomeComponent } from './components/landing-home/landing-home.component';
import { PrimeNGModule } from '@shared/modules/primeng/primeng.module';

@Component({
  selector: 'app-landing',
  standalone: true,
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss',
  imports: [
    ProductsFeaturedComponent,
    LandingHomeComponent,
    PrimeNGModule,
  ],
})
export class LandingComponent {}
