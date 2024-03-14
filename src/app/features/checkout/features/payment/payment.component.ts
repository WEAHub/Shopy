import {
  CheckoutDeliveryFacade,
  CheckoutFacade,
} from '@/app/store/checkout';
import { LoadingOverlayComponent } from '@/shared/components/loading-overlay/loading-overlay.component';
import { PrimeNGModule } from '@/shared/modules/primeng/primeng.module';
import { Component, OnInit } from '@angular/core';
import { CartResumeComponent } from './components/cart-resume/cart-resume.component';
import { DeliveryResumeComponent } from './components/delivery-resume/delivery-resume.component';
import { PaymentFormComponent } from './components/payment-form/payment-form.component';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [
    LoadingOverlayComponent,
    PrimeNGModule,
    CartResumeComponent,
    DeliveryResumeComponent,
    PaymentFormComponent,
  ],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.scss',
})
export class PaymentComponent implements OnInit {
  $invoice = this.checkoutFacade.getInvoice$();
  $invoiceLoading = this.checkoutFacade.isLoading$();
  $invoiceError = this.checkoutFacade.getError$();

  $delivery = this.deliveryFacade.getDelivery$();

  // RECORDAR DESCOMENTAR EL GUARD checkoutGuard
  constructor(
    private deliveryFacade: CheckoutDeliveryFacade,
    private checkoutFacade: CheckoutFacade
  ) {}

  ngOnInit(): void {
    this.checkoutFacade.initInvoice();
  }
}
