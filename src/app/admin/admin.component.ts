import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../shared/services/account/account.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {

  isAdmin = true;

  constructor(
    private router: Router,
    private accountService: AccountService
  ){}

  logOut():void {
    this.router.navigate(['/']);
    localStorage.removeItem('currentUser');
    this.accountService.isUserLogin$.next(true);
    this.hideAdminHeader()
  }

  hideAdminHeader(): void {
    this.isAdmin = false;
  }

}
