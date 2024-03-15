import { CheckoutDeliveryFacade } from './checkout-delivery.facade';
import { CheckoutPaymentFacade } from './checkout-payment.facade';
import { CheckoutFacade } from './checkout.facade';

export const checkoutFeatureFacades = [
  CheckoutFacade,
  CheckoutDeliveryFacade,
  CheckoutPaymentFacade,
];

export { CheckoutFacade, CheckoutDeliveryFacade, CheckoutPaymentFacade };
