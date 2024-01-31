import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";

// Selectors
import { getError, getUser, isCartenticated, isLoading } from "../selectors/cart.selectors";
import { HttpErrorResponse } from "@angular/common/http";

@Injectable()
export class CartFacade {

  constructor(private store: Store) {}

}