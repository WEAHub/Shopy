import { Injectable } from '@angular/core';
import { PagedValorations } from '@shared/interfaces/products/Valorations';
import valorations from '@shared/mocks/valorations.json';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ValorationsService {
  constructor() {}

  getValorations(
    limit: number,
    page: number
  ): Observable<PagedValorations> {
    const pagedValorations: PagedValorations = {
      page,
      count: this.getValorationsCount(),
      valorations: valorations.slice(page * limit, limit),
    };
    return of(pagedValorations);
  }

  getValorationsCount(): number {
    return valorations.length;
  }
}
