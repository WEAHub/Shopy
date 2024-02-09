import {
  randomizeProduct,
  getPercentagePrice,
  percentage,
  rndNumberRange,
} from './productRandomizer';

test('should calculate percentage price', () => {
  const price = 100;
  const discount = 20;
  const expected = 80;
  const discountPrice = getPercentagePrice(price, discount);
  expect(discountPrice).toEqual(expected);
});

test('should return random number', () => {
  const min = 100;
  const max = 150;
  const num = rndNumberRange(min, max);
  expect(num).toBeGreaterThanOrEqual(min);
  expect(num).toBeLessThanOrEqual(max);
});

test('should calculate percentage', () => {
  const partial = 20;
  const total = 100;
  const res = percentage(partial, total);
  const expected = 20;
  expect(res).toEqual(expected);
});

test('should randomize product information', () => {
  const product = {
    id: 1,
    title: 'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops',
    price: 109.95,
    description:
      'Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday',
    category: "men's clothing",
    image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
    rating: { rate: 3.9, count: 120 },
  };
  const rProduct = randomizeProduct(product);
  expect(rProduct).toHaveProperty('modifiers');
});
