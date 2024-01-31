import { HttpErrorResponse } from '@angular/common/http';

export interface EntityDataState<T> {
  loading?: boolean;
  entity?: T;
  error?: HttpErrorResponse;
}
