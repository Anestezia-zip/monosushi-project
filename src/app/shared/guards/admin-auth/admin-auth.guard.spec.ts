import { TestBed } from '@angular/core/testing';

import { AdminAuthGuard } from './admin-auth.guard';
import {RouterTestingModule} from "@angular/router/testing";
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot} from "@angular/router";
import {AuthGuard} from "../auth/auth.guard";

describe('AdminAuthGuard', () => {
  let guard: AdminAuthGuard;
  let router: Router;


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      providers: [AuthGuard]
    });
    guard = TestBed.inject(AdminAuthGuard);
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should return true when currentUser is a ADMIN', () => {
    const currentUser = { role: 'ADMIN' };
    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(currentUser));
    const route = {} as ActivatedRouteSnapshot;
    const state = {} as RouterStateSnapshot;
    let canActivateResult: boolean;

    canActivateResult = guard.canActivate(route, state) as boolean;

    expect(canActivateResult).toEqual(true);
  });
});
