import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FichaGrupoComponent } from './ficha-grupo.component';

describe('FichaGrupoComponent', () => {
  let component: FichaGrupoComponent;
  let fixture: ComponentFixture<FichaGrupoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FichaGrupoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FichaGrupoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
