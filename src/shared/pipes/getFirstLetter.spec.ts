import { GetFirstLetter } from './getFirstLetter';

describe('getFirstLetter Pipe', () => {
  const pipe = new GetFirstLetter();

  it('transforms "Test" to "T"', () => {
    expect(pipe.transform('Test')).toBe('T');
  });
});
