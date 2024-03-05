import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductViewCommentsComponent } from './product-view-comments.component';

describe('ProductViewCommentsComponent', () => {
  let component: ProductViewCommentsComponent;
  let fixture: ComponentFixture<ProductViewCommentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductViewCommentsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductViewCommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
