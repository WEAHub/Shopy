export interface ProductsParameters {
  limit: number;
  sort: ProductsSorts;
}

export enum ProductsSorts {
  DESC = 'desc',
  ASC = 'asc'
}