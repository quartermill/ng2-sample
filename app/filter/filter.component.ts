import {Component, ViewChild}  from '@angular/core'
import { NavigationService }   from '../navigation-panel/navigation.service';
import { NameFilterComponent } from './name-filter/name-filter.component';
import { CriteriaComponent }   from './criteria/criteria.component';
import { ResultsComponent }    from './results/results.component';
import { Criteria }            from './criteria';
import { FilterResponse }      from './filter-response';

@Component({
	moduleId: module.id,
    selector: 'filter',
    templateUrl: './filter.component.html',
    providers: []
    
})

export class FilterComponent {
	private title : string = 'Stock Filter';
	private desc  : string = 'Soon to be the best stock filter ever.';

	@ViewChild(CriteriaComponent) criteriaComponent: CriteriaComponent; 
	@ViewChild(ResultsComponent)  resultsComponent: ResultsComponent; 

	constructor(private navService : NavigationService ) {
	}


	ngAfterContentInit() {
	 	this.navService.identify(this.title, this.desc);
	}

	filterClickEvent() {
		this.criteriaComponent.filterClick(1);
	}

	filterIndexClickEvent(index : number) {
		// console.log('click : ' + index);
		this.criteriaComponent.filterClick(index);	}

	filterCompleteEvent(response : FilterResponse) {
		this.resultsComponent.filterComplete(response);
	}
}