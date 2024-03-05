import { Token } from '@shared/interfaces/user/UserAuth';

function parseToken(token: string): string {
  const [, cleanToken] = token.split('.');
  return cleanToken;
}

function decodeToken(token: string): Token {
  const base64Decoded = atob(parseToken(token));
  return JSON.parse(base64Decoded);
}

function isTokenExpired(token: string): boolean {
  const decToken = decodeToken(token);
  const exp = decToken.exp;
  const now = Math.floor(Date.now() / 1000);
  return exp <= now;
}

export { parseToken, decodeToken, isTokenExpired };
