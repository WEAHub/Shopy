import { Pipe, PipeTransform } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

export interface ErrorsParsed {
  name?: string;
  params?: unknown;
}

@Pipe({
  standalone: true,
  name: 'errorsValidator',
})
export class ErrorsValidatorPipe implements PipeTransform {
  transform(errors: ValidationErrors): ErrorsParsed[] {
    const errorsParsed = Object.entries(errors).map(([name, params]) => {
      return {
        name,
        params,
      };
    });
    return errorsParsed;
  }
}
