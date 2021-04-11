import { ComponentFixture, TestBed } from '@angular/core/testing';

<<<<<<< HEAD:microcareApp/src/app/pages/configuracion/configuracion.component.spec.ts
import { ConfiguracionComponent } from './configuracion.component';

describe('ConfiguracionComponent', () => {
  let component: ConfiguracionComponent;
  let fixture: ComponentFixture<ConfiguracionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfiguracionComponent ]
=======
import { IngestaMenuComponent } from './ingesta-menu.component';

describe('IngestaMenuComponent', () => {
  let component: IngestaMenuComponent;
  let fixture: ComponentFixture<IngestaMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IngestaMenuComponent ]
>>>>>>> fran4:microcareApp/src/app/pages/ingesta-menu/ingesta-menu.component.spec.ts
    })
    .compileComponents();
  });

  beforeEach(() => {
<<<<<<< HEAD:microcareApp/src/app/pages/configuracion/configuracion.component.spec.ts
    fixture = TestBed.createComponent(ConfiguracionComponent);
=======
    fixture = TestBed.createComponent(IngestaMenuComponent);
>>>>>>> fran4:microcareApp/src/app/pages/ingesta-menu/ingesta-menu.component.spec.ts
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
