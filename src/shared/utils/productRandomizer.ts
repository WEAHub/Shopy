import { Product, ProductModifiers } from "@shared/interfaces/products/Product";

export function randomizeProduct(product: Product) {

  const discountPercent: number = 100 - (100 - rndNumberRange(50, 100));
  const discountPrice: number = getPercentagePrice(
    product.price, 
    discountPercent
  )

  const finalPrice = Math.round(product.price - discountPrice);

  const stockTotal: number = rndNumberRange(5, 500)
  const stock: number = rndNumberRange(0, stockTotal)
  const stockPercent: number = percentage(stock, stockTotal)

  const stars: number = rndNumberRange(0, 5);
  
  const estimatedDays = rndNumberRange(3, 10)

  const modifiers: ProductModifiers = {
    discountPercent,
    discountPrice,
    finalPrice,
    stockTotal,
    stockPercent,
    stock,
    stars,
    estimatedDays
  }

  return {
    ...product,
    modifiers
  }

}

function rndNumberRange(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function getPercentagePrice(price: number, percent: number): number {
  return Math.round((price - (price * (percent / 100))))
}

function percentage(partialValue: number, totalValue: number): number {
  return Math.round((100 * partialValue) / totalValue);
} 