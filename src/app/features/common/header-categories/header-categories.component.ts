import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject } from '@angular/core';
import { ActivatedRoute, Params, RouterModule } from '@angular/router';
import { CategoriesFacade } from '@app/store/categories';
import { DirectivesModule } from '@shared/directives/directives.module';
import { Categories } from '@shared/interfaces/categories/Category';
import { Observable, map, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-header-categories',
  standalone: true,
  imports: [DirectivesModule, CommonModule, RouterModule],
  templateUrl: './header-categories.component.html',
  styleUrl: './header-categories.component.scss',
})
export class HeaderCategoriesComponent {
  private destroyRef = inject(DestroyRef);
  isLoading$: Observable<boolean> = this.categoriesFacade.isLoading$();
  categories$: Observable<Categories> = this.categoriesFacade.getCategories$();
  activeCategory$: Observable<string> = this.route.queryParams.pipe(
    takeUntilDestroyed(this.destroyRef),
    map((params: Params) => params['category'])
  );

  constructor(
    private categoriesFacade: CategoriesFacade,
    private route: ActivatedRoute
  ) {}
}
