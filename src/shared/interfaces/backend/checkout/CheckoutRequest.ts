import { Delivery } from '../../checkout/Delivery';

export interface InvoicePayment {
  paymentData: string;
  shipping: Delivery;
}
