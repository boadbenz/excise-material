/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { RequestArrestLawsuitService } from './RequestArrestLawsuit.service';

describe('Service: RequestArrestLawsuit', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RequestArrestLawsuitService]
    });
  });

  it('should ...', inject([RequestArrestLawsuitService], (service: RequestArrestLawsuitService) => {
    expect(service).toBeTruthy();
  }));
});
