// Base Environment

export const environment = {
  defaultLang: 'es',
  languages: ['es', 'en'],
  production: false,
  hostUrl: 'http://shopy.com/',
  apiURL: 'https://fakestoreapi.com',
  apiEndpoints: {
    AUTH: 'auth/login',
    REFRESH: 'auth/refresh',
    USERS: 'user/',
    CATEGORIES: 'category/',
    PRODUCTS: 'product/',
    CARTS: 'carts/',
    CHECKOUT: 'checkout',
  },
  cipher: {
    secret: 'ccSecretKey<3',
    iv: 'ccMegaIV<3',
  },
};
