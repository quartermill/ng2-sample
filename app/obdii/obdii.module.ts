import { NgModule }		         from '@angular/core';
import { CommonModule }          from '@angular/common';
import { ObdiiComponent }        from './obdii.component';
import { ObdiiRoutingModule }    from './obdii-routing.module';
import { SessionPanelComponent } from './session-panel/session-panel.component';
import { SessionListComponent }  from './session-panel/session-list.component';
import { SessionListService }    from './session-panel/session-list.service';
import { SessionInfoService }    from './session-panel/session-info.service';

@NgModule({
  imports:      [ CommonModule, ObdiiRoutingModule ],
  declarations: [ ObdiiComponent, SessionPanelComponent, SessionListComponent ],
  providers:    [ SessionListService, SessionInfoService ]
})
export class ObdiiModule { }