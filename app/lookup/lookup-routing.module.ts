import { NgModule }		    from '@angular/core';
import { RouterModule }     from '@angular/router';
import { LookupModule }     from './lookup.module';
import { LookupComponent }  from './lookup.component';
import { AuthGuard }        from '../auth-guard.service';


@NgModule({
  imports: [RouterModule.forChild([
    { path: '', component: LookupComponent, canActivate: [AuthGuard] }
  ])],
  exports: [RouterModule]
})
export class LookupRoutingModule {}