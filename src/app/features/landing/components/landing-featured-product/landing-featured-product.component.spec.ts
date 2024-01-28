import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingFeaturedProductComponent } from './landing-featured-product.component';

describe('LandingFeaturedProductComponent', () => {
  let component: LandingFeaturedProductComponent;
  let fixture: ComponentFixture<LandingFeaturedProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LandingFeaturedProductComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LandingFeaturedProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
