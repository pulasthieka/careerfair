import { TestBed } from '@angular/core/testing';

import { EndInterviewService } from './end-interview.service';

describe('EndInterviewService', () => {
  let service: EndInterviewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EndInterviewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
