export interface ProductsParameters {
  limit?: number;
  sort?: ProductsSorts;
}

export enum ProductsSorts {
  DESC = 'DESC',
  ASC = 'ASC',
}
