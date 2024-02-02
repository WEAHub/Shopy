import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductViewSendComponent } from './product-view-send.component';

describe('ProductViewSendComponent', () => {
  let component: ProductViewSendComponent;
  let fixture: ComponentFixture<ProductViewSendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductViewSendComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductViewSendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
