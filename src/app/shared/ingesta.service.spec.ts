import { TestBed } from '@angular/core/testing';

import { IngestaService } from './ingesta.service';

describe('IngestaService', () => {
  let service: IngestaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IngestaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
