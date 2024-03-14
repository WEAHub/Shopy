import { Product } from '../products/Product';
import { Delivery } from './Delivery';

export interface Invoice {
  id?: number;
  userId: number;
  products: Product[];
  amount?: number;
  address: string;
  delivery: Delivery;
  date: Date;
}
