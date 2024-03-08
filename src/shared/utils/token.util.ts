import { Token } from '@shared/interfaces/user/UserAuth';

function parseToken(token: string): string {
  const [, cleanToken] = token.split('.');
  return cleanToken;
}

function decodeToken(token: string): Token {
  const base64Decoded = atob(parseToken(token));
  return JSON.parse(base64Decoded);
}

async function isTokenExpired(token: string): Promise<boolean> {
  const decToken = decodeToken(token);
  const fiveMin = 5 * 60;
  const exp = decToken.exp - fiveMin;
  const now = Math.floor(Date.now() / 1000);
  return exp <= now;
}

export { parseToken, decodeToken, isTokenExpired };
