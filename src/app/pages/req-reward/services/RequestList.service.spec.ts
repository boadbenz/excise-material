/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { RequestListService } from './RequestList.service';

describe('Service: RequestList', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RequestListService]
    });
  });

  it('should ...', inject([RequestListService], (service: RequestListService) => {
    expect(service).toBeTruthy();
  }));
});
