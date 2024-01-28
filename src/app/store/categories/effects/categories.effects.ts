import { Injectable } from "@angular/core";
import { Actions, OnInitEffects, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, of, switchMap, tap } from "rxjs";

import { onGetCategories, onGetCategoriesError, onInitCategories } from "../actions/categories.actions";
import { Action } from "@ngrx/store";
import { CategoriesService } from "@shared/services/categories/categories.service";

@Injectable()
export class CategoriesEffects implements OnInitEffects {
  constructor(
    private actions$: Actions,
    private categoriesService: CategoriesService
  ) {}

  ngrxOnInitEffects(): Action {
    return onInitCategories();
  }

  init$ = createEffect(() => 
    this.actions$.pipe(
      ofType(onInitCategories),
      switchMap(() => this.categoriesService.getCategories()
        .pipe(
          map(categories => onGetCategories({ categories })),
          catchError(error => of(onGetCategoriesError({ error }))),
        )
      )
    )
  )

}
