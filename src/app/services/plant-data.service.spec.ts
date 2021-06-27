import { TestBed } from '@angular/core/testing';

import { PlantDataService } from './plant-data.service';

describe('PlantDataService', () => {
  let service: PlantDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlantDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
