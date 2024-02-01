import { Component } from '@angular/core';
import { LandingFeaturedComponent } from './components/landing-featured/landing-featured.component';
import { LandingHomeComponent } from './components/landing-home/landing-home.component';
import { PrimeNGModule } from '@shared/modules/primeng/primeng.module';

@Component({
  selector: 'app-landing',
  standalone: true,
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss',
  imports: [LandingFeaturedComponent, LandingHomeComponent, PrimeNGModule],
})
export class LandingComponent {
  constructor() {}
}
