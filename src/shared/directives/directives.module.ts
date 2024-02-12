import { NgModule } from '@angular/core';
import { LazyImgDirective } from './lazy-img/lazy-img.directive';
import { VarDirective } from './ng-var/ng-var.directive';
import { GoogleplaceDirective } from './google-places/google-places.directive';
import { SwiperDirective } from './swiper/swiper.directive';

@NgModule({
  declarations: [
    LazyImgDirective,
    VarDirective,
    GoogleplaceDirective,
    SwiperDirective,
  ],
  exports: [
    LazyImgDirective,
    VarDirective,
    GoogleplaceDirective,
    SwiperDirective,
  ],
})
export class DirectivesModule {}
