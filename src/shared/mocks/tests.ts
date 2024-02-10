const tokenMock = 'testToken';

const tokenResponseMock = { token: tokenMock };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const errorMock: any = {
  status: 401,
  statusText: 'Unknown Error',
  url: 'https://fakestoreapi.com/auth/login',
  ok: false,
  name: 'HttpErrorResponse',
  message:
    'Http failure response for https://fakestoreapi.com/auth/login: 401 ',
  error: {},
};
const userMock = {
  address: {
    city: 'Test',
    number: 21,
    street: 'Test',
    zipcode: '123123',
    address: 'Test Address',
    province: 'test',
    geolocation: { lat: '12', long: '34' },
  },
  id: 1,
  username: 'mor_2314',
  email: 'morrison@gmail.com',
  password: '83r5^_',
  name: { firstname: 'david', lastname: 'morrison' },
  phone: '1-570-236-7033',
  token: 'testToken',
};

const cartMock = {
  id: 1,
  userId: 1,
  date: new Date('2020-03-02T00:00:00.000Z'),
  products: [
    { productId: 1, quantity: 4 },
    { productId: 2, quantity: 1 },
    { productId: 3, quantity: 6 },
  ],
  __v: 0,
};

const cartsMock = [
  {
    id: 7,
    userId: 8,
    date: '2020-03-01T00:00:00.000Z',
    products: [{ productId: 18, quantity: 1 }],
    __v: 0,
  },
  {
    id: 6,
    userId: 4,
    date: '2020-03-01T00:00:00.000Z',
    products: [
      { productId: 10, quantity: 2 },
      { productId: 12, quantity: 3 },
    ],
    __v: 0,
  },
];

const usersMock = [
  {
    address: {
      geolocation: { lat: '-37.3159', long: '81.1496' },
      city: 'kilcoole',
      street: 'new road',
      number: 7682,
      zipcode: '12926-3874',
    },
    id: 1,
    email: 'john@gmail.com',
    username: 'johnd',
    password: 'm38rmF$',
    name: { firstname: 'john', lastname: 'doe' },
    phone: '1-570-236-7033',
    __v: 0,
  },
  {
    address: {
      geolocation: { lat: '-37.3159', long: '81.1496' },
      city: 'kilcoole',
      street: 'Lovers Ln',
      number: 7267,
      zipcode: '12926-3874',
    },
    id: 2,
    email: 'morrison@gmail.com',
    username: 'mor_2314',
    password: '83r5^_',
    name: { firstname: 'david', lastname: 'morrison' },
    phone: '1-570-236-7033',
    __v: 0,
  },
  {
    address: {
      geolocation: { lat: '40.3467', long: '-30.1310' },
      city: 'Cullman',
      street: 'Frances Ct',
      number: 86,
      zipcode: '29567-1452',
    },
    id: 3,
    email: 'kevin@gmail.com',
    username: 'kevinryan',
    password: 'kev02937@',
    name: { firstname: 'kevin', lastname: 'ryan' },
    phone: '1-567-094-1345',
    __v: 0,
  },
];

const productMock = {
  id: 1,
  title: 'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops',
  price: 109.95,
  description:
    'Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday',
  category: "men's clothing",
  image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
  rating: { rate: 3.9, count: 120 },
};

const productsByCategoryMock = [
  {
    id: 5,
    title:
      "John Hardy Women's Legends Naga Gold & Silver Dragon Station Chain Bracelet",
    price: 695,
    description:
      "From our Legends Collection, the Naga was inspired by the mythical water dragon that protects the ocean's pearl. Wear facing inward to be bestowed with love and abundance, or outward for protection.",
    category: 'jewelery',
    image:
      'https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg',
    rating: { rate: 4.6, count: 400 },
  },
];
export {
  errorMock,
  tokenMock,
  userMock,
  tokenResponseMock,
  cartMock,
  cartsMock,
  usersMock,
  productMock,
  productsByCategoryMock,
};
