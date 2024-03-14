import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryResumeComponent } from './delivery-resume.component';

describe('DeliveryResumeComponent', () => {
  let component: DeliveryResumeComponent;
  let fixture: ComponentFixture<DeliveryResumeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeliveryResumeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DeliveryResumeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
