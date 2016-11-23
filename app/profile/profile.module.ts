import { NgModule }		         from '@angular/core';
import { CommonModule }          from '@angular/common';
import { ProfileComponent }      from './profile.component';
import { ProfileRoutingModule }  from './profile-routing.module';
import { ProfilePanelComponent } from './profile-panel/profile-panel.component';

@NgModule({
  imports:      [ CommonModule, ProfileRoutingModule ],
  declarations: [ ProfileComponent, ProfilePanelComponent ],
  providers:    [ ]
})
export class ProfileModule { }