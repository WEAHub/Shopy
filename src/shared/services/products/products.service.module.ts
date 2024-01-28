import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ProductsService } from './products.service';

@NgModule({
  providers: [
    HttpClient,
    ProductsService
  ],
})
export class ProductsServiceModule { }