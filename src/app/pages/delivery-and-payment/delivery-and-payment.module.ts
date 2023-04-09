import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DeliveryAndPaymentRoutingModule} from "./delivery-and-payment-routing.module";
import {SharedModule} from "../../shared/shared.module";
import {DeliveryAndPaymentComponent} from "./delivery-and-payment.component";



@NgModule({
  declarations: [
    DeliveryAndPaymentComponent
  ],
  imports: [
    CommonModule,
    DeliveryAndPaymentRoutingModule,
    SharedModule
  ]
})
export class DeliveryAndPaymentModule { }
