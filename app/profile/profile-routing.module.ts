import { NgModule }		    from '@angular/core';
import { RouterModule }     from '@angular/router';
import { ProfileModule }    from './profile.module';
import { ProfileComponent } from './profile.component';
import { AuthGuard }        from '../auth-guard.service';


@NgModule({
  imports: [RouterModule.forChild([
    { path: '', component: ProfileComponent, canActivate: [AuthGuard] }
  ])],
  exports: [RouterModule]
})
export class ProfileRoutingModule {}