export interface Valoration {
  comment: string;
  date: string;
  score: number;
  name: string;
}

export interface PagedValorations {
  valorations: Valoration[];
  page: number;
  count: number;
}
