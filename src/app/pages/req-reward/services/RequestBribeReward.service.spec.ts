/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { RequestBribeRewardService } from './RequestBribeReward.service';

describe('Service: RequestBribeReward', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RequestBribeRewardService]
    });
  });

  it('should ...', inject([RequestBribeRewardService], (service: RequestBribeRewardService) => {
    expect(service).toBeTruthy();
  }));
});
