import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LazyImgDirective } from './lazy-img.directive';
import { By } from '@angular/platform-browser';

@Component({
  selector: 'app-test-component',
  template: '<img src="https://fakestoreapi.com/icons/logo.png"/>',
})
class TestComponent {}

describe('Lazy Image Directive', () => {
  let fixture: ComponentFixture<TestComponent>;
  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [TestComponent, LazyImgDirective],
    }).createComponent(TestComponent);
    fixture.detectChanges();
  });

  it('should be able to test directive without lazy support', () => {
    const img = fixture.debugElement.query(By.css('img')).nativeElement;
    const attr = img.getAttribute('loading');
    expect(attr).not.toBe('lazy');

    Object.defineProperty(HTMLImageElement.prototype, 'loading', {
      value: 'lazy',
    });
  });

  it('should be able to test directive', () => {
    const img = fixture.debugElement.query(By.css('img')).nativeElement;
    const attr = img.getAttribute('loading');
    expect(attr).toBe('lazy');
  });
});
