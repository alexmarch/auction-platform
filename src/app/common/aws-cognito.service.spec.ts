import { TestBed, inject } from '@angular/core/testing';
import { AwsCognitoService } from './aws-cognito.service';

describe('AwsCognitoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AwsCognitoService]
    });
  });

  it('should ...', inject([AwsCognitoService], (service: AwsCognitoService) => {
    expect(service).toBeTruthy();
  }));
});
