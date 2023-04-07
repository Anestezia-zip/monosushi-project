import { Component } from '@angular/core';

@Component({
  selector: 'app-cabinet-info',
  templateUrl: './cabinet-info.component.html',
  styleUrls: ['./cabinet-info.component.scss']
})
export class CabinetInfoComponent {
  public name!: string;
  public email!: string;
  public surname!: string;

  constructor() { }

  ngOnInit(): void {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') as string);
    this.name = currentUser.name;
    this.surname = currentUser.surname;
    this.email = currentUser.email;
  }
}
