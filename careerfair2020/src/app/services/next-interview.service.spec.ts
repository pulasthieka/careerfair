import { TestBed } from '@angular/core/testing';

import { NextInterviewService } from './next-interview.service';

describe('NextInterviewService', () => {
  let service: NextInterviewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NextInterviewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
