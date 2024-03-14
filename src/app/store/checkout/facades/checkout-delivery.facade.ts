import { Delivery } from '@/shared/interfaces/checkout/Delivery';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getDelivery } from '../selectors/checkout-delivery.selectors';
import { onSetCheckoutDelivery } from '../actions/checkout-delivery.actions';

@Injectable()
export class CheckoutDeliveryFacade {
  constructor(private store: Store) {}

  getDelivery$(): Observable<Delivery> {
    return this.store.select(getDelivery);
  }

  setDelivery(delivery: Delivery): void {
    this.store.dispatch(onSetCheckoutDelivery({ delivery }));
  }
}
