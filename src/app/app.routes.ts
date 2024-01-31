import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'landing',
  },
  {
    path: 'landing',
    loadComponent: () =>
      import('./features/landing/landing.component').then(
        m => m.LandingComponent
      ),
  },
  {
    path: 'products',
    loadChildren: () =>
      import('./features/products/product.routes').then(
        m => m.ProductsRoutingModule
      ),
  },
];
