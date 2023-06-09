import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from "../shared/shared.module";

import {AdminRoutingModule} from "./admin-routing.module";
import {AdminComponent} from "./admin.component";
import {AdminDiscountComponent} from "./admin-discount/admin-discount.component";
import {AdminCategoryComponent} from "./admin-category/admin-category.component";
import {AdminProductComponent} from "./admin-product/admin-product.component";

@NgModule({
  declarations: [
    AdminComponent,
    AdminDiscountComponent,
    AdminCategoryComponent,
    AdminProductComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule
  ]
})
export class AdminModule { }
