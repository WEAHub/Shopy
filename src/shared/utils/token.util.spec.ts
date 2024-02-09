import { parseToken, decodeToken } from './token.util';

test('should decode token correctly', () => {
  const fakePadding = 'Aks';
  const realToken = 'eyAidG9rZW4iOiAidmFsaWQiIH0=';

  const jwToken = `${fakePadding}.${realToken}`;
  const token = parseToken(jwToken);
  expect(token).toBe(realToken);

  const decodedToken = decodeToken(jwToken);
  const expected = { token: 'valid' };
  expect(decodedToken).toEqual(expected);
});
