import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AuthService } from './auth.service';

@NgModule({
  providers: [
    HttpClient,
    AuthService
  ],
})
export class AuthServiceModule { }