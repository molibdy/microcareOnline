import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OmegasChartComponent } from './omegas-chart.component';

describe('OmegasChartComponent', () => {
  let component: OmegasChartComponent;
  let fixture: ComponentFixture<OmegasChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OmegasChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OmegasChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
