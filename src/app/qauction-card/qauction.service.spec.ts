import { TestBed, inject } from '@angular/core/testing';

import { QauctionService } from './qauction.service';

describe('QauctionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [QauctionService]
    });
  });

  it('should ...', inject([QauctionService], (service: QauctionService) => {
    expect(service).toBeTruthy();
  }));
});
