import { TestBed, inject } from '@angular/core/testing';

import { ViewSwitchService } from './view-switch.service';

describe('ViewSwitchService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ViewSwitchService]
    });
  });

  it('should be created', inject([ViewSwitchService], (service: ViewSwitchService) => {
    expect(service).toBeTruthy();
  }));
});
