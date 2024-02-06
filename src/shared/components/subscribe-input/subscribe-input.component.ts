import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { PrimeNGModule } from '@shared/modules/primeng/primeng.module';

@Component({
  selector: 'app-subscribe-input',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, PrimeNGModule],
  templateUrl: './subscribe-input.component.html',
  styleUrl: './subscribe-input.component.scss',
})
export class SubscribeInputComponent {
  subForm!: FormGroup;

  constructor(private fb: FormBuilder) {
    this.prepareForm();
  }

  private prepareForm(): void {
    this.subForm = this.fb.group({
      email: [
        null,
        Validators.compose([
          Validators.required,
          Validators.email,
          Validators.minLength(1),
        ]),
      ],
    });
  }

  private onSubmit(): void {
    if (this.subForm.invalid) return;

    const { email } = this.subForm.value;

    console.log(email);
  }
}
