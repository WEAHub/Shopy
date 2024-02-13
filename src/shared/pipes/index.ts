import { NgModule } from '@angular/core';
import { GetFirstLetter } from './getFirstLetter';
import { ErrorsValidatorPipe } from './input-validator.pipe';
import { CategoryPipe } from './category.pipe';

@NgModule({
  imports: [GetFirstLetter, ErrorsValidatorPipe, CategoryPipe],
  exports: [GetFirstLetter, ErrorsValidatorPipe, CategoryPipe],
})
export class PipesModule {}
