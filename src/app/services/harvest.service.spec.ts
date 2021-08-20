import { TestBed } from '@angular/core/testing';

import { HarvestService } from './harvest.service';

describe('HarvestService', () => {
  let service: HarvestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HarvestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
