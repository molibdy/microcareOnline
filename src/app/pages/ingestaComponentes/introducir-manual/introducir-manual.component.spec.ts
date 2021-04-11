import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntroducirManualComponent } from './introducir-manual.component';

describe('IntroducirManualComponent', () => {
  let component: IntroducirManualComponent;
  let fixture: ComponentFixture<IntroducirManualComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IntroducirManualComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IntroducirManualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
