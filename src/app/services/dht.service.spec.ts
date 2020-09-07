import { TestBed } from '@angular/core/testing';

import { DHTService } from './dht.service';

describe('DhtService', () => {
  let service: DHTService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DHTService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
