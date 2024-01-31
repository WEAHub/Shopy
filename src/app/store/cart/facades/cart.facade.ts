import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

@Injectable()
export class CartFacade {
  constructor(private store: Store) {}
}
