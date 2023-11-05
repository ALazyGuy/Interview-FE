import { TestBed } from '@angular/core/testing';

import { SersorsService } from './sersors.service';

describe('SersorsService', () => {
  let service: SersorsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SersorsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
