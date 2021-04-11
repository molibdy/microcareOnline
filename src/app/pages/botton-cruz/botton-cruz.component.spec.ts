import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BottonCruzComponent } from './botton-cruz.component';

describe('BottonCruzComponent', () => {
  let component: BottonCruzComponent;
  let fixture: ComponentFixture<BottonCruzComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BottonCruzComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BottonCruzComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
