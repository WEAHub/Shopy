import { AuthFacade } from '@/app/store/auth';
import { CheckoutDeliveryFacade } from '@/app/store/checkout/facades/checkout-delivery.facade';
import { AutocompletePlacesComponent } from '@/shared/components/autocomplete-places/autocomplete-places.component';
import { InputValidatorComponent } from '@/shared/components/input-validator/input-validator.component';
import { LoadingOverlayComponent } from '@/shared/components/loading-overlay/loading-overlay.component';
import { AddressLocation } from '@/shared/interfaces/location/location';
import { User } from '@/shared/interfaces/user/User';
import { PrimeNGModule } from '@/shared/modules/primeng/primeng.module';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, take } from 'rxjs';

@Component({
  selector: 'app-delivery',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    LoadingOverlayComponent,
    PrimeNGModule,
    InputValidatorComponent,
    AutocompletePlacesComponent,
  ],
  templateUrl: './delivery.component.html',
  styleUrl: './delivery.component.scss',
})
export class DeliveryComponent implements OnInit {
  deliveryForm!: FormGroup;

  user$: Observable<User> = this.authFacade.getUser$();

  constructor(
    private fb: FormBuilder,
    private authFacade: AuthFacade,
    private deliveryFacade: CheckoutDeliveryFacade,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.prepareForm();
    this.initUser();
  }

  prepareForm(): void {
    this.deliveryForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      address: ['', Validators.required],
      street: ['', Validators.required],
      number: ['', Validators.required],
      door: ['', Validators.required],
      city: ['', Validators.required],
      zipcode: ['', Validators.required],
      email: [
        '',
        Validators.compose([Validators.required, Validators.email]),
      ],
      phone: ['', Validators.required],
      province: ['', Validators.required],
    });
  }

  initUser(): void {
    this.user$.pipe(take(1)).subscribe(user => {
      this.deliveryForm.patchValue({ ...user, ...user.location });
    });
  }

  onAddressChange(address: AddressLocation): void {
    this.deliveryForm.patchValue(address);
  }

  saveDelivery(): void {
    this.deliveryFacade.setDelivery(this.deliveryForm.value);
    this.router.navigateByUrl('/checkout/payment');
  }
}
