import {
  CheckoutDeliveryFacade,
  CheckoutFacade,
} from '@/app/store/checkout';
import { LoadingOverlayComponent } from '@/shared/components/loading-overlay/loading-overlay.component';
import { PrimeNGModule } from '@/shared/modules/primeng/primeng.module';
import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { CartResumeComponent } from './components/cart-resume/cart-resume.component';
import { DeliveryResumeComponent } from './components/delivery-resume/delivery-resume.component';
import { PaymentFormComponent } from './components/payment-form/payment-form.component';
import { CheckoutPaymentFacade } from '@/app/store/checkout/facades/checkout-payment.facade';
import { InvoicePayment } from '@/shared/interfaces/backend/checkout/CheckoutRequest';
import { lastValueFrom, take } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';

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
  private destroyRef = inject(DestroyRef);

  $invoice = this.checkoutFacade.getInvoice$();
  $invoiceLoading = this.checkoutFacade.isLoading$();
  $invoiceError = this.checkoutFacade.getError$();

  $payment = this.paymentFacade.getInvoice$();
  $paymentLoading = this.paymentFacade.isLoading$();
  $paymentError = this.paymentFacade.getError$();

  $delivery = this.deliveryFacade.getDelivery$();

  // RECORDAR DESCOMENTAR EL GUARD checkoutGuard
  constructor(
    private deliveryFacade: CheckoutDeliveryFacade,
    private checkoutFacade: CheckoutFacade,
    private paymentFacade: CheckoutPaymentFacade,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.checkoutFacade.initInvoice();
  }

  async onPaymentSubmit(paymentData: string): Promise<void> {
    const invoice: InvoicePayment = {
      paymentData,
      shipping: await lastValueFrom(
        this.deliveryFacade.getDelivery$().pipe(take(1))
      ),
    };

    this.initPaymentComplete();
    this.paymentFacade.initPayment(invoice);
  }

  private initPaymentComplete(): void {
    this.$payment
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() =>
        this.router.navigateByUrl('/checkout/confirmation')
      );
  }
}
