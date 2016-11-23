import { NgModule, ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductComponent }     from './product/product.component';
import { ContactComponent }     from './contact/contact.component';
import { PleaseLoginComponent } from './please-login/please-login.component';
import { DashboardComponent }   from './dashboard/dashboard.component';
import { AuthGuard }            from './auth-guard.service';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/product',
    pathMatch: 'full'
  },
  {
    path: 'product',
    component: ProductComponent
  },
  {
    path: 'contact',
    component: ContactComponent
  },
  {
    path: 'please-login',
    component: PleaseLoginComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'obdii',
    loadChildren: 'app/obdii/obdii.module#ObdiiModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'filter',
    loadChildren: 'app/filter/filter.module#FilterModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'lookup',
    loadChildren: 'app/lookup/lookup.module#LookupModule',
    canActivate: [AuthGuard]
  },{
    path: 'lookup/:symbol',
    loadChildren: 'app/lookup/lookup.module#LookupModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'admin',
    loadChildren: 'app/admin/admin.module#AdminModule',
    canActivate: [AuthGuard]
  },
  { path: 'profile',
    loadChildren: 'app/profile/profile.module#ProfileModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
