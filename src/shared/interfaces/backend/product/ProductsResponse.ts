import { Paginated } from '@shared/interfaces/products/Paginated';
import { Product } from '@shared/interfaces/products/Product';

export type ProductsResponseBody = Paginated<Product>;
export type ProductResponseBody = Product;
