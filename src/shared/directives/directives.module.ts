import { NgModule } from "@angular/core";
import { LazyImgDirective } from "./LazyImage/lazy-img.directive";
import { VarDirective } from "./ng-var/ng-var.directive";

@NgModule({
  declarations: [
    LazyImgDirective,
    VarDirective
  ],
  exports: [
    LazyImgDirective,
    VarDirective
  ]
})
export class DirectivesModule {}
