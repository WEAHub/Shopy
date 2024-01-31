import { Token } from '@shared/interfaces/user/UserAuth';

function parseToken(token: string): string {
  const [, cleanToken] = token.split('.');
  return cleanToken;
}

function decodeToken(token: string): Token {
  const base64Decoded = atob(parseToken(token));
  return JSON.parse(base64Decoded);
}

export { parseToken, decodeToken };
