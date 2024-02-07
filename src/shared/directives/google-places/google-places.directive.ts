/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Directive,
  ElementRef,
  EventEmitter,
  Output,
} from '@angular/core';
import { NgModel } from '@angular/forms';

declare let google: any;

@Directive({
  selector: '[googlePlaces]',
  providers: [NgModel],
})
export class GoogleplaceDirective {
  @Output() addressChange: EventEmitter<any> = new EventEmitter<any>();
  autocomplete: any;
  private element!: HTMLInputElement;

  constructor(el: ElementRef) {
    const input: HTMLInputElement = el.nativeElement;

    const autoCompleteParams = {
      componentRestrictions: {
        country: ['ES'],
      },
    };

    this.autocomplete = new google.maps.places.Autocomplete(
      input,
      autoCompleteParams
    );

    google.maps.event.addListener(
      this.autocomplete,
      'place_changed',
      () => {
        const place = this.autocomplete.getPlace();
        this.addressChange.emit(place);
      }
    );
  }
}
