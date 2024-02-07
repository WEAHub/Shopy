import { NgModule } from '@angular/core';
import { LazyImgDirective } from './lazy-img/lazy-img.directive';
import { VarDirective } from './ng-var/ng-var.directive';
import { GoogleplaceDirective } from './google-places/google-places.directive';

@NgModule({
  declarations: [LazyImgDirective, VarDirective, GoogleplaceDirective],
  exports: [LazyImgDirective, VarDirective, GoogleplaceDirective],
})
export class DirectivesModule {}
