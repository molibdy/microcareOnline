import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BottonBurgerComponent } from './botton-burger.component';

describe('BottonBurgerComponent', () => {
  let component: BottonBurgerComponent;
  let fixture: ComponentFixture<BottonBurgerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BottonBurgerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BottonBurgerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
