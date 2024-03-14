import { CheckoutDeliveryFacade } from './checkout-delivery.facade';
import { CheckoutFacade } from './checkout.facade';

export const checkoutFeatureFacades = [
  CheckoutFacade,
  CheckoutDeliveryFacade,
];

export { CheckoutFacade, CheckoutDeliveryFacade };
