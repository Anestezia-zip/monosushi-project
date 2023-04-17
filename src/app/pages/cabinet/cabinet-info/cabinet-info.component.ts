import {Component, OnInit} from '@angular/core';
import {IUser} from "../../../shared/interfaces/interfaces";

@Component({
  selector: 'app-cabinet-info',
  templateUrl: './cabinet-info.component.html',
  styleUrls: ['./cabinet-info.component.scss']
})
export class CabinetInfoComponent implements OnInit{

  public currentUser!: IUser;

  ngOnInit() {
    this.getUser()
  }

  getUser(): void {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser') as string);
    console.log(this.currentUser)
  }



}
