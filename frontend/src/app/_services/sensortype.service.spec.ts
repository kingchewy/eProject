import { TestBed, inject } from '@angular/core/testing';

import { SensortypeService } from './sensortype.service';

describe('SensortypeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SensortypeService]
    });
  });

  it('should be created', inject([SensortypeService], (service: SensortypeService) => {
    expect(service).toBeTruthy();
  }));
});
