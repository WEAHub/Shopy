// Dev Environment

import { environment as environmentBase } from './environment.base';

export const environment = {
  ...environmentBase,
  apiURL: 'http://localhost:3000',
  production: false,
};
