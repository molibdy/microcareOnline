import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FichaMicroComponent } from './ficha-micro.component';

describe('FichaMicroComponent', () => {
  let component: FichaMicroComponent;
  let fixture: ComponentFixture<FichaMicroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FichaMicroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FichaMicroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
