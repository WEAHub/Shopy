import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductComponent } from './product.component';
import { ProductViewComponent } from './features/product-view/product-view.component';


const routes: Routes = [
  {
    path: '',
    component: ProductComponent,

  },
  {
    path: ':id',
    component: ProductViewComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule {}