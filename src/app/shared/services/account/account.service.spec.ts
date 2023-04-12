import { TestBed } from '@angular/core/testing';

import { AccountService } from './account.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {ILogin} from "../../interfaces/interfaces";
import {environment} from "../../../../environments/environment";

describe('AccountService', () => {
  let service: AccountService;
  let httpTestingController: HttpTestingController;
  let baseUrl: string;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [AccountService]
    });
    service = TestBed.inject(AccountService);
    httpTestingController = TestBed.inject(HttpTestingController);
    baseUrl = environment.BACKEND_URL + '/auth';
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should login with correct credentials', () => {
    const mockCredentials: ILogin = { email: 'test@example.com', password: 'password123' };
    const mockResponse = { token: 'some-token' };
    service.login(mockCredentials).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpTestingController.expectOne(`${baseUrl}?email=${mockCredentials.email}&password=${mockCredentials.password}`);
    expect(req.request.method).toEqual('GET');
    req.flush(mockResponse);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
