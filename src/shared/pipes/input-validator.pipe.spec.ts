import { ValidationErrors } from '@angular/forms';
import { ErrorsParsed, ErrorsValidatorPipe } from './input-validator.pipe';

describe('ErrorsValidator Pipe', () => {
  const pipe = new ErrorsValidatorPipe();

  it('transforms error validator to iterable errors"', () => {
    const expected: ErrorsParsed[] = [
      { name: 'minlength', params: { requiredLength: 1 } },
    ];

    const errors: ValidationErrors = {
      minlength: {
        requiredLength: 1,
      },
    };

    expect(pipe.transform(errors)).toEqual(expected);
  });

  it('pipe returns nulls if no errors', () => {
    expect(pipe.transform({} as ValidationErrors)).toEqual([]);
  });
});
