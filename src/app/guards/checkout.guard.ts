import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map, take } from 'rxjs';
import { CheckoutDeliveryFacade } from '../store/checkout';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const checkoutGuard: CanActivateFn = (route, state) => {
  const deliveryFacade = inject(CheckoutDeliveryFacade);
  const router = inject(Router);

  return deliveryFacade.getDelivery$().pipe(
    take(1),
    map(
      delivery =>
        (!!delivery && !!Object.keys(delivery).length) ||
        router.createUrlTree(['/checkout/delivery'])
    )
  );
};
