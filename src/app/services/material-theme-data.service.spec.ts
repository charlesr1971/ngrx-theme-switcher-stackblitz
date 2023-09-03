import { TestBed } from '@angular/core/testing';

import { MaterialThemeDataService } from './material-theme-data.service';

describe('MaterialThemeDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MaterialThemeDataService = TestBed.get(MaterialThemeDataService);
    expect(service).toBeTruthy();
  });
});
