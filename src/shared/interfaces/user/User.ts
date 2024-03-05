export interface User extends UserTokens {
  id?: number;
  email: string;
  password?: string;
  firstName: string;
  lastName: string;
  location: UserAddress;
  username?: string;
  phone: string;
}

export interface UserAddress {
  city: string;
  street: string;
  number: number;
  zipcode: number;
  lat: number;
  long: number;
  province?: string;
  address?: string;
}

export interface UserTokens {
  accessToken: string;
  refreshToken: string;
}
