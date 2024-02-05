import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./products.component').then(m => m.ProductsComponent),
  },
  {
    path: ':id',
    loadComponent: () =>
      import('./features/product-view/product-view.component').then(
        m => m.ProductViewComponent
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductsRoutingModule {}
