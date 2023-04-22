import {Component, OnInit} from '@angular/core';
import {AccountService} from "../../../shared/services/account/account.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-cabinet-info',
  templateUrl: './cabinet-info.component.html',
  styleUrls: ['./cabinet-info.component.scss']
})
export class CabinetInfoComponent implements OnInit{

  public cabinetForm!: FormGroup;

  constructor(
    private accountService: AccountService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.initCabinetForm();
    this.getUser();
    // this.checkUpdatesUserLogin()
  }

  initCabinetForm(): void {
    this.cabinetForm = this.fb.group({
      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      phoneNumber: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]]
    });
  }

  getUser(): void {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') as string);
    this.cabinetForm.setValue({
      firstName: currentUser.firstName,
      lastName: currentUser.lastName,
      phoneNumber: currentUser.phoneNumber,
      email: currentUser.email
    });
  }

  // checkUpdatesUserLogin():void {
  //   this.accountService.isUserLogin$.subscribe(() => {
  //     this.getUser();
  //   })
  // }


}
