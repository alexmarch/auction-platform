import { TestBed, async, inject } from '@angular/core/testing';

import { IsAuthentificatedGuard } from './is-authentificated.guard';

describe('IsAuthentificatedGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IsAuthentificatedGuard]
    });
  });

  it('should ...', inject([IsAuthentificatedGuard], (guard: IsAuthentificatedGuard) => {
    expect(guard).toBeTruthy();
  }));
});
