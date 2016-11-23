import { NgModule }		         from '@angular/core';
import { CommonModule }          from '@angular/common';
import { AdminComponent }        from './admin.component';
import { AdminRoutingModule }  	 from './admin-routing.module';
import { SummaryComponent } 	 from './admin-summary/admin-summary.component';
import { DetailComponent } 		 from './admin-detail/admin-detail.component';
import { AdminSummaryService }   from './admin-summary/admin-summary.service';
import { AdminDetailService }    from './admin-detail/admin-detail.service';

@NgModule({
  imports:      [ CommonModule, AdminRoutingModule ],
  declarations: [ AdminComponent, SummaryComponent, DetailComponent ],
  providers:    [ AdminSummaryService, AdminDetailService ]
})
export class AdminModule { }