export interface Cart {
  id: number;
  userId: number;
  date: Date;
  products: CartProducts[];
}

export interface CartProducts {
  productId: number;
  quantity: number;
}
