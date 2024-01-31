export interface User {
  id: number;
  email: string;
  password: string;
  name: UserName;
  address: UserAddress;
  token?: string;
}

export interface UserName {
  firstname: string;
  lastname: string;
}

export interface UserAddress {
  city: string;
  street: string;
  number: number;
  zipcode: string;
  geolocation: UserGeoLocation;
}

export interface UserGeoLocation {
  lat: string;
  long: string;
}
