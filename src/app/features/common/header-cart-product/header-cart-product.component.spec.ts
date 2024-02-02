import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderCartProductComponent } from './header-cart-product.component';

describe('HeaderCartProductComponent', () => {
  let component: HeaderCartProductComponent;
  let fixture: ComponentFixture<HeaderCartProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderCartProductComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderCartProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
