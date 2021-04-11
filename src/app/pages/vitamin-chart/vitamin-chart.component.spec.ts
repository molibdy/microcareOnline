import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VitaminChartComponent } from './vitamin-chart.component';

describe('VitaminChartComponent', () => {
  let component: VitaminChartComponent;
  let fixture: ComponentFixture<VitaminChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VitaminChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VitaminChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
