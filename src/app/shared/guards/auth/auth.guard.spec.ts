import { TestBed } from '@angular/core/testing';

import { AuthGuard } from './auth.guard';
import {RouterTestingModule} from "@angular/router/testing";
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot} from "@angular/router";

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      providers: [AuthGuard]
    });
    guard = TestBed.inject(AuthGuard);
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });


  it('should return true when currentUser is a USER', () => {
    const currentUser = { role: 'USER' };
    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(currentUser));
    const route = {} as ActivatedRouteSnapshot;
    const state = {} as RouterStateSnapshot;
    let canActivateResult: boolean;
    canActivateResult = guard.canActivate(route, state) as boolean;
    expect(canActivateResult).toEqual(true);
  });




});
