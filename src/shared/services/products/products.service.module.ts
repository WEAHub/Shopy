import { NgModule } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductsService } from './products.service';

@NgModule({
  providers: [HttpClient, ProductsService],
})
export class ProductsServiceModule {}
