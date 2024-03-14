import { Delivery } from '@/shared/interfaces/checkout/Delivery';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-delivery-resume',
  standalone: true,
  imports: [],
  templateUrl: './delivery-resume.component.html',
  styleUrl: './delivery-resume.component.scss',
})
export class DeliveryResumeComponent {
  @Input() delivery!: Delivery;
}
