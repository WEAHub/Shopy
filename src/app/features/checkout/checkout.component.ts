import { BaseLayoutComponent } from '@/shared/components/base-layout/base-layout.component';
import { Component, inject, DestroyRef } from '@angular/core';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [BaseLayoutComponent],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss',
})
export class CheckoutComponent {
  private destroyRef = inject(DestroyRef);

  constructor() {}
}
