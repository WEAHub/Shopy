import { checkoutGuard } from '@/app/guards/checkout.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./checkout.component').then(m => m.CheckoutComponent),
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: '',
      },
      {
        path: '',
        loadComponent: () =>
          import('./features/checkout-cart/checkout-cart.component').then(
            m => m.CheckoutCartComponent
          ),
      },
      {
        path: 'delivery',
        loadComponent: () =>
          import('./features/delivery/delivery.component').then(
            m => m.DeliveryComponent
          ),
      },
      {
        path: 'payment',
        canActivate: [checkoutGuard],
        loadComponent: () =>
          import('./features/payment/payment.component').then(
            m => m.PaymentComponent
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CheckoutRoutingModule {}
