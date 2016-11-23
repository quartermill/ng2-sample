import { NgModule }		  from '@angular/core';
import { RouterModule }   from '@angular/router';
import { ObdiiModule }    from './obdii.module';
import { ObdiiComponent } from './obdii.component';
import { AuthGuard }      from '../auth-guard.service';


@NgModule({
  imports: [RouterModule.forChild([
    { path: '', component: ObdiiComponent, canActivate: [AuthGuard] }
  ])],
  exports: [RouterModule]
})
export class ObdiiRoutingModule {}