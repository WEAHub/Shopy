export interface ProductsParameters {
  limit?: number;
  sortColumn?: string;
  sort?: ProductsSorts;
}

export enum ProductsSorts {
  DESC = 'DESC',
  ASC = 'ASC',
}
