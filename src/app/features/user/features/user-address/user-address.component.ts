import { CommonModule } from '@angular/common';
import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
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
import { Observable, tap } from 'rxjs';

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
  private destroyRef = inject(DestroyRef);
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
      id: [null],
      address: ['', Validators.required],
      lat: [null, Validators.required],
      lng: [null, Validators.required],
      province: ['', Validators.required],
      street: ['', Validators.required],
      number: ['', Validators.required],
      city: ['', Validators.required],
      zipcode: ['', Validators.required],
      door: ['', Validators.required],
    });

    this.$user
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        tap(this.fillForm.bind(this))
      )
      .subscribe();
  }

  private fillForm(user: User): void {
    this.addressForm.patchValue({
      id: user.id,
      ...user.location,
    });
    this.addressForm.markAllAsTouched();
  }

  onAddressChange(address: AddressLocation): void {
    this.addressForm.patchValue(address);
    this.addressForm.markAllAsTouched();
  }

  onSubmit(): void {
    if (this.addressForm.invalid) return;
    const formData = this.addressForm.value;

    const userUpdate: Partial<User> = {
      location: {
        city: formData.city,
        number: Number(formData.number),
        street: formData.street,
        zipcode: Number(formData.zipcode),
        address: formData.address,
        province: formData.province,
        lat: Number(formData.lat),
        long: Number(formData.lng),
        door: formData.door,
      },
    };
    this.authFacade.updateUser(formData.id, userUpdate);
  }
}
