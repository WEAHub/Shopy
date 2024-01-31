export interface UserAuth {
  token?: string;
}

export interface Token {
  sub: number;
  user: string;
  iat: number;
}
