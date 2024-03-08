import { CheckoutFacade } from '@/app/store/checkout';
import { BaseLayoutComponent } from '@/shared/components/base-layout/base-layout.component';
import { Component, inject, DestroyRef, OnInit } from '@angular/core';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [BaseLayoutComponent],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss',
})
export class CheckoutComponent implements OnInit {
  private destroyRef = inject(DestroyRef);

  constructor(private checkoutFacade: CheckoutFacade) {}

  ngOnInit(): void {
    this.checkoutFacade.getCheckout();
  }
}
