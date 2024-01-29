export type Products = Product[]

export interface Product {
  id: number
  title: string
  price: number
  description: string
  category: string
  image: string
  rating: ProductRating
  modifiers: ProductModifiers
}

export interface ProductRating {
  rate: number
  count: number
}

export interface ProductModifiers {
  discountPercent: number
  discountPrice: number
  finalPrice: number
  stock: number
  stockTotal: number
  stockPercent: number
  stars: number
  estimatedDays: number
}