import { TestBed } from '@angular/core/testing';

import { StockQueryService } from './stock-query.service';

describe('StockQueryService', () => {
  let service: StockQueryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StockQueryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
