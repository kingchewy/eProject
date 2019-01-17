import { TestBed, inject } from '@angular/core/testing';

import { CircuitbreakerService } from './circuitbreaker.service';

describe('CircuitbreakerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CircuitbreakerService]
    });
  });

  it('should be created', inject([CircuitbreakerService], (service: CircuitbreakerService) => {
    expect(service).toBeTruthy();
  }));
});
