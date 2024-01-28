import { Component } from '@angular/core';
import { CategoriesFacade } from '@app/store/categories';
import { Categories } from '@shared/interfaces/categories/Category';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header-categories',
  standalone: true,
  imports: [],
  templateUrl: './header-categories.component.html',
  styleUrl: './header-categories.component.scss'
})
export class HeaderCategoriesComponent {

  isLoading$: Observable<boolean> = this.categoriesFacade.isLoading$()
  categories$: Observable<Categories> = this.categoriesFacade.getCategories$()

  constructor(
    private categoriesFacade: CategoriesFacade
  ) {}

}
