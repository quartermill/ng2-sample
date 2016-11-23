import { NgModule }		    from '@angular/core';
import { RouterModule }     from '@angular/router';
import { FilterModule }     from './filter.module';
import { FilterComponent }  from './filter.component';
import { AuthGuard }        from '../auth-guard.service';


@NgModule({
  imports: [RouterModule.forChild([
    { path: '', component: FilterComponent, canActivate: [AuthGuard] }
  ])],
  exports: [RouterModule]
})
export class FilterRoutingModule {}