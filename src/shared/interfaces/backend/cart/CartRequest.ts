export interface CartsParameters {
  limit: number;
  sort: CartsSorts;
}

export enum CartsSorts {
  DESC = 'desc',
  ASC = 'asc'
}