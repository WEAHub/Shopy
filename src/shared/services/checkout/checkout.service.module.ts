import { NgModule } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CheckoutService } from './checkout.service';

@NgModule({
  providers: [HttpClient, CheckoutService],
})
export class CheckoutServiceModule {}
