import { Delivery } from '@/shared/interfaces/checkout/Delivery';
import { createAction, props } from '@ngrx/store';

const featureName = 'Checkout';
const featureModule = 'Delivery';
const featureHeader = `[${featureName}] [${featureModule}]`;

export const onSetCheckoutDelivery = createAction(
  `${featureHeader}: Set Delivery`,
  props<{ delivery: Delivery }>()
);
