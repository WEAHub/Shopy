import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

// Interfaces

// Actions

// Selectors
import { HttpErrorResponse } from '@angular/common/http';
import {
  isLoading,
  getCategories,
  getError,
} from '../selectors/categories.selectors';
import { Categories } from '@shared/interfaces/categories/Category';

@Injectable()
export class CategoriesFacade {
  constructor(private store: Store) {}

  public isLoading$(): Observable<boolean> {
    return this.store.select(isLoading);
  }

  public getCategories$(): Observable<Categories> {
    return this.store.select(getCategories);
  }

  public getError$(): Observable<HttpErrorResponse> {
    return this.store.select(getError);
  }
}
