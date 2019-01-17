import { TestBed, inject } from '@angular/core/testing';

import { AppliancetypeService } from './appliancetype.service';

describe('AppliancetypeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AppliancetypeService]
    });
  });

  it('should be created', inject([AppliancetypeService], (service: AppliancetypeService) => {
    expect(service).toBeTruthy();
  }));
});
