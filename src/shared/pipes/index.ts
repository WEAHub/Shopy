import { NgModule } from '@angular/core';
import { GetFirstLetter } from './getFirstLetter';
import { ErrorsValidatorPipe } from './input-validator.pipe';

@NgModule({
  imports: [GetFirstLetter, ErrorsValidatorPipe],
  exports: [GetFirstLetter, ErrorsValidatorPipe],
})
export class PipesModule {}
