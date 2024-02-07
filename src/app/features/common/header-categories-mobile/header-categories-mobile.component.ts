import { Component } from '@angular/core';
import { PrimeNGModule } from '@shared/modules/primeng/primeng.module';
import { HeaderUserButtonComponent } from '../header-user-button/header-user-button.component';
import { CategoriesFacade } from '@app/store/categories';
import { Observable } from 'rxjs';
import { Categories } from '@shared/interfaces/categories/Category';
import { CommonModule } from '@angular/common';
import { PipesModule } from '@shared/pipes';

@Component({
  selector: 'app-header-categories-mobile',
  standalone: true,
  imports: [
    PrimeNGModule,
    HeaderUserButtonComponent,
    CommonModule,
    PipesModule,
  ],
  templateUrl: './header-categories-mobile.component.html',
  styleUrl: './header-categories-mobile.component.scss',
})
export class HeaderCategoriesMobileComponent {
  visible: boolean = false;

  $categories: Observable<Categories> =
    this.categoriesFacade.getCategories$();

  constructor(private categoriesFacade: CategoriesFacade) {}
}
