import { CheckoutPaymentEffects } from './checkout-payment.effects';
import { CheckoutEffects } from './checkout.effects';

export const checkoutFeatureEffects = [
  CheckoutEffects,
  CheckoutPaymentEffects,
];
