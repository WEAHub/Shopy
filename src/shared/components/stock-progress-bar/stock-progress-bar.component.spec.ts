import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockProgressBarComponent } from './stock-progress-bar.component';

describe('StockProgressBarComponent', () => {
  let component: StockProgressBarComponent;
  let fixture: ComponentFixture<StockProgressBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StockProgressBarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(StockProgressBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
