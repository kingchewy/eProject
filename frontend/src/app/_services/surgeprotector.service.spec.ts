import { TestBed, inject } from '@angular/core/testing';

import { SurgeprotectorService } from './surgeprotector.service';

describe('SurgeprotectorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SurgeprotectorService]
    });
  });

  it('should be created', inject([SurgeprotectorService], (service: SurgeprotectorService) => {
    expect(service).toBeTruthy();
  }));
});
