import { Injectable } from '@angular/core';
import { Actions } from '@ngrx/effects';
import { CartsService } from '../../../../shared/services/carts/carts.service';
import { UserService } from '@shared/services/user/user.service';

@Injectable()
export class CartEffects {
  constructor(
    private actions$: Actions,
    private cartService: CartsService,
    private userService: UserService
  ) {}
}
