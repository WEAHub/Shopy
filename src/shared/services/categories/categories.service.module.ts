import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CategoriesService } from './categories.service';

@NgModule({
  providers: [
    HttpClient,
    CategoriesService
  ],
})
export class CategoriesServiceModule { }