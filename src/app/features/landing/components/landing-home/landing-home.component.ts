import { Component } from '@angular/core';
import { SubscribeInputComponent } from '@shared/components/subscribe-input/subscribe-input.component';

@Component({
  selector: 'app-landing-home',
  standalone: true,
  imports: [SubscribeInputComponent],
  templateUrl: './landing-home.component.html',
  styleUrl: './landing-home.component.scss',
})
export class LandingHomeComponent {}
