import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { DiscountComponent } from './pages/discount/discount.component';
import { DiscountInfoComponent } from './pages/discount-info/discount-info.component';
import { ProductComponent } from './pages/product/product.component';
import { ProductInfoComponent } from './pages/product-info/product-info.component';
import { DeliveryAndPaymentComponent } from './pages/delivery-and-payment/delivery-and-payment.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';

import { AdminComponent } from './admin/admin.component';
import { AdminDiscountComponent } from './admin/admin-discount/admin-discount.component';
import { AdminCategoryComponent } from './admin/admin-category/admin-category.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'discounts', component: DiscountComponent },
  { path: 'products/:category', component: ProductComponent },
  { path: 'delivery-and-payment', component: DeliveryAndPaymentComponent },
  { path: 'about-us', component: AboutUsComponent },

  { path: 'admin', component: AdminComponent, children: [
    { path: 'discount', component: AdminDiscountComponent },
    { path: 'category', component: AdminCategoryComponent },
    { path: '', pathMatch: 'full', redirectTo: 'discount' },
  ] },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
