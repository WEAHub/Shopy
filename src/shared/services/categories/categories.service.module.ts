import { NgModule } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CategoriesService } from './categories.service';

@NgModule({
  providers: [HttpClient, CategoriesService],
})
export class CategoriesServiceModule {}
