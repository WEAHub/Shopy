import { InputValidatorComponent } from '@/shared/components/input-validator/input-validator.component';
import { PrimeNGModule } from '@/shared/modules/primeng/primeng.module';
import CreditCardValidator from '@/shared/validators/credit-card.validator';
import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
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
  ],
  templateUrl: './payment-form.component.html',
  styleUrl: './payment-form.component.scss',
})
export class PaymentFormComponent implements OnInit {
  @Input() invoiceId!: number;
  payForm!: FormGroup;

  blockNumbersOnly: RegExp = /[^0-9]/;
  // RECORDAR DESCOMENTAR EL GUARD checkoutGuard
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.prepareForm();
  }

  prepareForm(): void {
    this.payForm = this.fb.group({
      invoiceId: [this.invoiceId, Validators.required],
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

  doPayment(): void {
    const formData = this.payForm.value;
    console.log(formData);
  }
}
