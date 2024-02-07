import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthFacade } from '@app/store/auth';
import { AutocompletePlacesComponent } from '@shared/components/autocomplete-places/autocomplete-places.component';
import { InputValidatorComponent } from '@shared/components/input-validator/input-validator.component';
import { AddressLocation } from '@shared/interfaces/location/location';
import { User } from '@shared/interfaces/user/User';
import { PrimeNGModule } from '@shared/modules/primeng/primeng.module';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-address',
  standalone: true,
  imports: [
    CommonModule,
    AutocompletePlacesComponent,
    FormsModule,
    ReactiveFormsModule,
    InputValidatorComponent,
    PrimeNGModule,
  ],
  templateUrl: './user-address.component.html',
  styleUrl: './user-address.component.scss',
})
export class UserAddressComponent implements OnInit {
  $user: Observable<User> = this.authFacade.getUser$();
  $userLoading: Observable<boolean> = this.authFacade.isLoading$();
  addressForm!: FormGroup;

  constructor(
    private authFacade: AuthFacade,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.prepareForm();
  }

  private prepareForm(): void {
    this.addressForm = this.fb.group({
      address: ['', Validators.required],
      lat: [null, Validators.required],
      lng: [null, Validators.required],
      province: ['', Validators.required],
      street: ['', Validators.required],
      streetNumber: ['', Validators.required],
      locality: ['', Validators.required],
      postalCode: ['', Validators.required],
    });
  }

  onAddressChange(address: AddressLocation): void {
    this.addressForm.patchValue(address);
    this.addressForm.markAsTouched();
  }

  onSubmit(): void {
    if (this.addressForm.invalid) return;
  }
}
