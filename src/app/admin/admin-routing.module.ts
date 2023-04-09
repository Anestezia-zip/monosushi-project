import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AdminComponent} from "./admin.component";
import {AdminDiscountComponent} from "./admin-discount/admin-discount.component";
import {AdminCategoryComponent} from "./admin-category/admin-category.component";
import {AdminProductComponent} from "./admin-product/admin-product.component";



const routes: Routes = [
  { path: '', component: AdminComponent, children: [
      { path: 'discount', component: AdminDiscountComponent },
      { path: 'category', component: AdminCategoryComponent },
      { path: 'product', component: AdminProductComponent },
      { path: '', pathMatch: 'full', redirectTo: 'discount' },
    ] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
