import { NgModule }		       from '@angular/core';
import { CommonModule }        from '@angular/common';
import { FormsModule }         from '@angular/forms';
import { LookupRoutingModule } from './lookup-routing.module';
import { LookupComponent }     from './lookup.component';
import { ChartComponent }      from './chart/chart.component';
import { OptionsComponent }    from './options/options.component';
import { GoogleChart }         from '../../node_modules/angular2-google-chart/directives/angular2-google-chart.directive';
import { LookupService }       from './lookup-service';

@NgModule({
  imports:      [ CommonModule, FormsModule, LookupRoutingModule ],
  declarations: [ LookupComponent, ChartComponent, OptionsComponent, GoogleChart ],
  providers:    [ LookupService ]
})
export class LookupModule { }