/* eslint-disable @typescript-eslint/no-explicit-any */
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import {
  ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { DirectivesModule } from '@shared/directives/directives.module';
import { AddressLocation } from '@shared/interfaces/location/location';
import { PrimeNGModule } from '@shared/modules/primeng/primeng.module';
import { processLocation } from '@shared/utils/places';

@Component({
  selector: 'app-autocomplete-places',
  standalone: true,
  imports: [CommonModule, FormsModule, PrimeNGModule, DirectivesModule],
  templateUrl: './autocomplete-places.component.html',
  styleUrl: './autocomplete-places.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: AutocompletePlacesComponent,
    },
  ],
})
export class AutocompletePlacesComponent implements ControlValueAccessor {
  @Output() addressChange = new EventEmitter<AddressLocation>();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onChange = (address: string) => {};
  onTouched = () => {};

  touched = false;
  disabled = false;

  address!: string;

  showIcon: boolean = true;
  constructor() {}

  private markAsTouched(): void {
    if (!this.touched) {
      this.touched = true;
      this.onTouched();
    }
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  public onAddressChange(googleAddress: any): void {
    const location: AddressLocation = processLocation(googleAddress);
    this.addressChange.emit(location);
    this.onChange(location.address);
    this.markAsTouched();
  }

  writeValue(value: string): void {
    this.address = value;
    return;
  }
}
