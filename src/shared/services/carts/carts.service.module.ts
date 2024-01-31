import { NgModule } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CartsService } from './carts.service';

@NgModule({
  providers: [
    HttpClient,
    CartsService
  ],
})
export class CartsServiceModule { }