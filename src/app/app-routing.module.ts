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
import { AdminProductComponent } from './admin/admin-product/admin-product.component';
import { ProductInfoResolver } from './shared/services/product/product-info.resolver';
import { DiscountInfoResolver } from './shared/services/discount/discount-info.resolver';
import { AuthGuard } from './shared/guards/auth/auth.guard';
import { AuthorizationComponent } from './pages/authorization/authorization.component';
import { CabinetComponent } from './pages/cabinet/cabinet.component';
import { CabinetInfoComponent } from './pages/cabinet/cabinet-info/cabinet-info.component';
import { CabinetHistoryComponent } from './pages/cabinet/cabinet-history/cabinet-history.component';
import { CabinetPassComponent } from './pages/cabinet/cabinet-pass/cabinet-pass.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'discounts', component: DiscountComponent },
  { path: 'discounts/:id', component: DiscountInfoComponent, resolve: {
    discountInfo: DiscountInfoResolver
  } },
  { path: 'products/:category', component: ProductComponent },
  { path: 'products/:category/:id', component: ProductInfoComponent, resolve: {
    productInfo: ProductInfoResolver
  } },
  { path: 'delivery-and-payment', component: DeliveryAndPaymentComponent },
  { path: 'about-us', component: AboutUsComponent },
  { path: 'auth', component: AuthorizationComponent },
  { path: 'cabinet', component: CabinetComponent, canActivate: [AuthGuard], children: [
    { path: 'info', component: CabinetInfoComponent },
    { path: 'history', component: CabinetHistoryComponent },
    { path: 'password', component: CabinetPassComponent },
    { path: '', pathMatch: 'full', redirectTo: 'info' }
  ] },

  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard], children: [
    { path: 'discount', component: AdminDiscountComponent },
    { path: 'category', component: AdminCategoryComponent },
    { path: 'product', component: AdminProductComponent },
    { path: '', pathMatch: 'full', redirectTo: 'discount' },
  ] },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
