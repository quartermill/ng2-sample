import { NgModule }		  from '@angular/core';
import { RouterModule }   from '@angular/router';
import { AdminModule }    from './admin.module';
import { AdminComponent } from './admin.component';
import { AuthGuard }      from '../auth-guard.service';


@NgModule({
  imports: [RouterModule.forChild([
    { path: '', component: AdminComponent, canActivate: [AuthGuard] }
  ])],
  exports: [RouterModule]
})
export class AdminRoutingModule {}