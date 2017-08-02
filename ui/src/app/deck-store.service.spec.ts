import { TestBed, inject } from '@angular/core/testing';

import { DeckStoreService } from './deck-store.service';

describe('DeckStoreService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DeckStoreService]
    });
  });

  it('should be created', inject([DeckStoreService], (service: DeckStoreService) => {
    expect(service).toBeTruthy();
  }));
});
