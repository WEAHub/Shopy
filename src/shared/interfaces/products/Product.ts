export type Products = Product[];

export interface Product {
  /*   
  id: number;
  title: string;
  price: number;
  description: string;
  categoryId: number;
  image: string;
  rating: ProductRating;
  modifiers?: ProductModifiers; 
  */
  id?: number;
  name: string;
  image: string;
  description: string;
  stock: number;
  stockTotal: number;
  modifiers?: ProductModifiers;
  addedDate: Date;
  updateDate: Date;
  categoryId: number;
  price: number;
  published?: boolean;
  stars: number;
}

export interface ProductRating {
  rate: number;
  count: number;
}

export interface ProductModifiers {
  discountPercent: number;
  discountPrice?: number;
  hasChoice: boolean;
  /*
  finalPrice: number;
  stock: number;
  stockTotal: number;
  stockPercent: number;
  stars: number;
  estimatedDays: number;
  */
}
