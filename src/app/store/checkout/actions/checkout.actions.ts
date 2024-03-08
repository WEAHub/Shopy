import { createAction, props } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';
import { Invoice } from '@/shared/interfaces/checkout/Invoice';

const featureName = 'Checkout';
const featureModule = 'Preview';
const featureHeader = `[${featureName}] [${featureModule}]`;

export const onInitCheckout = createAction(`${featureHeader}: Init`);

export const onGetCheckoutSuccess = createAction(
  `${featureHeader}: Get Checkout Successs`,
  props<{ invoice: Invoice }>()
);

export const onGetCheckoutError = createAction(
  `${featureHeader}: Get Checkout Error`,
  props<{ error: HttpErrorResponse }>()
);
