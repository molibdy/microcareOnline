import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficaOthersComponent } from './grafica-others.component';

describe('GraficaOthersComponent', () => {
  let component: GraficaOthersComponent;
  let fixture: ComponentFixture<GraficaOthersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GraficaOthersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GraficaOthersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
