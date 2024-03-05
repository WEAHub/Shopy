export interface UserAuth {
  token?: string;
}

export interface Token {
  sub: number;
  iat: number;
  exp: number;
  username: string;
  email: string;
}
