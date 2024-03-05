import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject } from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  Params,
  Router,
  RouterModule,
} from '@angular/router';
import { CategoriesFacade } from '@app/store/categories';
import { DirectivesModule } from '@shared/directives/directives.module';
import { Categories } from '@shared/interfaces/categories/Category';
import { Observable, filter, map } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TranslateModule } from '@ngx-translate/core';
import { PipesModule } from '@shared/pipes';

@Component({
  selector: 'app-header-categories',
  standalone: true,
  imports: [
    DirectivesModule,
    CommonModule,
    RouterModule,
    TranslateModule,
    PipesModule,
  ],
  templateUrl: './header-categories.component.html',
  styleUrl: './header-categories.component.scss',
})
export class HeaderCategoriesComponent {
  private destroyRef = inject(DestroyRef);

  isLoading$: Observable<boolean> = this.categoriesFacade.isLoading$();

  categories$: Observable<Categories> =
    this.categoriesFacade.getCategories$();

  activeCategory$: Observable<string> = this.route.queryParams.pipe(
    map((params: Params) => params['category'])
  );

  hideCategories$: Observable<boolean> = this.router.events.pipe(
    takeUntilDestroyed(this.destroyRef),
    filter(event => event instanceof NavigationEnd),
    map(event => (event as NavigationEnd).url.startsWith('/user'))
  );

  constructor(
    private categoriesFacade: CategoriesFacade,
    private route: ActivatedRoute,
    private router: Router
  ) {}
}
