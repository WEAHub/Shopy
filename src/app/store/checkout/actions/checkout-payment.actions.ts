import { InvoicePayment } from '@/shared/interfaces/backend/checkout/CheckoutRequest';
import { Invoice } from '@/shared/interfaces/checkout/Invoice';
import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';

const featureName = 'Checkout';
const featureModule = 'Payment';
const featureHeader = `[${featureName}] [${featureModule}]`;

export const onPayInvoice = createAction(
  `${featureHeader}: Pay Invoice Init`,
  props<{ invoice: InvoicePayment }>()
);

export const onPayInvoiceSuccess = createAction(
  `${featureHeader}: Pay Invoice Successs`,
  props<{ invoice: Invoice }>()
);

export const onPayInvoiceError = createAction(
  `${featureHeader}: Pay Invoice Error`,
  props<{ error: HttpErrorResponse }>()
);
