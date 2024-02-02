import { Product } from '../products/Product';

export interface Cart {
  id: number;
  userId: number;
  date: Date;
  products: CartProduct[];
}

export interface CartProduct {
  productId: number;
  quantity: number;
  product?: Product | undefined;
}
