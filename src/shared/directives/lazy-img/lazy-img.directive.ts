import { Directive, ElementRef } from '@angular/core';

@Directive({ selector: 'img' })
export class LazyImgDirective {
  element: HTMLImageElement;

  constructor({ nativeElement }: ElementRef<HTMLImageElement>) {
    const supports = 'loading' in HTMLImageElement.prototype;
    this.element = nativeElement;
    if (supports) {
      this.element.setAttribute('loading', 'lazy');
    }
  }
}
