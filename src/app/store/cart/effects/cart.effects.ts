import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, exhaustMap, map, of, switchMap, tap } from "rxjs";
import { CartsService } from "../../../../shared/services/carts/carts.service";
import { UserService } from "@shared/services/user/user.service";
import { decodeToken } from "@shared/utils/token.util";


@Injectable()
export class CartEffects {

  constructor(
    private actions$: Actions,
    private cartService: CartsService,
    private userService: UserService
  ) {}


}