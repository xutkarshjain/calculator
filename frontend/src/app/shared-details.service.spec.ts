import { TestBed } from '@angular/core/testing';

import { SharedDetailsService } from './shared-details.service';

describe('SharedDetailsService', () => {
  let service: SharedDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharedDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
