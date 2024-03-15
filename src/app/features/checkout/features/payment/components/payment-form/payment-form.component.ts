import { CheckoutPaymentFacade } from '@/app/store/checkout';
import { InputValidatorComponent } from '@/shared/components/input-validator/input-validator.component';
import { LoadingOverlayComponent } from '@/shared/components/loading-overlay/loading-overlay.component';
import { PrimeNGModule } from '@/shared/modules/primeng/primeng.module';
import { CryptoService } from '@/shared/services/crypto/crypto.service';
import CreditCardValidator from '@/shared/validators/credit-card.validator';
import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-payment-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    InputValidatorComponent,
    PrimeNGModule,
    LoadingOverlayComponent,
  ],
  templateUrl: './payment-form.component.html',
  styleUrl: './payment-form.component.scss',
})
export class PaymentFormComponent implements OnInit {
  @Output() paymentDataSubmit = new EventEmitter<string>();

  $paymentLoading = this.paymentFacade.isLoading$();

  payForm!: FormGroup;
  blockNumbersOnly: RegExp = /[^0-9]/;
  // RECORDAR DESCOMENTAR EL GUARD checkoutGuard
  constructor(
    private fb: FormBuilder,
    private cryptoService: CryptoService,
    private paymentFacade: CheckoutPaymentFacade
  ) {}

  ngOnInit(): void {
    this.prepareForm();
  }

  prepareForm(): void {
    this.payForm = this.fb.group({
      cardHolder: [
        '',
        Validators.compose([
          Validators.required,
          Validators.maxLength(30),
        ]),
      ],
      cardNumber: [
        '',
        Validators.compose([
          Validators.required,
          Validators.maxLength(19),
          CreditCardValidator.luhnVerify(),
        ]),
      ],
      cardExpiration: [
        '',
        Validators.compose([
          Validators.required,
          CreditCardValidator.expirationVerify(),
        ]),
      ],
      cardCV2: [
        '',
        Validators.compose([Validators.required, Validators.maxLength(4)]),
      ],
    });
  }

  async doPayment(): Promise<void> {
    const payFormJson = JSON.stringify(this.payForm.value);
    const paymentData = await this.cryptoService.encryptData(payFormJson);
    this.paymentDataSubmit.emit(paymentData);
  }
}
