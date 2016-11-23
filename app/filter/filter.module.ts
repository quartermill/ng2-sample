import { NgModule }		        from '@angular/core';
import { CommonModule }         from '@angular/common';
import { FormsModule }          from '@angular/forms';
import { FilterComponent }      from './filter.component';
import { FilterRoutingModule }  from './filter-routing.module';
import { NameFilterComponent }  from './name-filter/name-filter.component';
import { CriteriaComponent }    from './criteria/criteria.component';
import { ResultsComponent }     from './results/results.component';
import { FilterService }        from './criteria/filter-service';

@NgModule({
  imports:      [ CommonModule, FormsModule, FilterRoutingModule ],
  declarations: [ FilterComponent, NameFilterComponent, CriteriaComponent, ResultsComponent ],
  providers:    [ FilterService ]
})
export class FilterModule { }

