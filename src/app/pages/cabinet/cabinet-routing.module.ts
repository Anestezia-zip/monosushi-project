import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CabinetComponent} from "./cabinet.component";
import {CabinetInfoComponent} from "./cabinet-info/cabinet-info.component";
import {CabinetHistoryComponent} from "./cabinet-history/cabinet-history.component";
import {CabinetPassComponent} from "./cabinet-pass/cabinet-pass.component";



const routes: Routes = [
  { path: '', component: CabinetComponent, children: [
        { path: 'info', component: CabinetInfoComponent },
        { path: 'history', component: CabinetHistoryComponent },
        { path: 'password', component: CabinetPassComponent },
        { path: '', pathMatch: 'full', redirectTo: 'info' }
    ] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CabinetRoutingModule { }
