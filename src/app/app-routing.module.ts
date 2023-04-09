import { NgModule } from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';

import { AuthGuard } from './shared/guards/auth/auth.guard';
import { AdminAuthGuard } from './shared/guards/admin-auth/admin-auth.guard';

const routes: Routes = [
  { path: '',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'discounts',
    loadChildren: () => import('./pages/discount/discount.module').then(m => m.DiscountModule)
  },
  {
    path: 'products',
    loadChildren: () => import('./pages/product/product.module').then(m => m.ProductModule)
  },
  {
    path: 'delivery-and-payment',
    loadChildren: () => import('./pages/delivery-and-payment/delivery-and-payment.module')
      .then(m => m.DeliveryAndPaymentModule)
  },
  {
    path: 'about-us',
    loadChildren: () => import('./pages/about-us/about-us.module').then(m => m.AboutUsModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('./pages/authorization/authorization.module').then(m => m.AuthorizationModule)
  },
  { path: 'cabinet',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/cabinet/cabinet.module').then(m => m.CabinetModule)
  },
  { path: 'admin',
    canActivate: [AdminAuthGuard],
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }










