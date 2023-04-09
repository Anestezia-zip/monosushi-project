import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from "../../shared/shared.module";

import {CabinetRoutingModule} from "./cabinet-routing.module";
import {CabinetComponent} from "./cabinet.component";
import {CabinetInfoComponent} from "./cabinet-info/cabinet-info.component";
import {CabinetHistoryComponent} from "./cabinet-history/cabinet-history.component";
import {CabinetPassComponent} from "./cabinet-pass/cabinet-pass.component";


@NgModule({
  declarations: [
    CabinetComponent,
    CabinetInfoComponent,
    CabinetHistoryComponent,
    CabinetPassComponent
  ],
  imports: [
    CommonModule,
    CabinetRoutingModule,
    SharedModule
  ]
})
export class CabinetModule { }
