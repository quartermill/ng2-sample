import { Component, 
	     Output, 
	     EventEmitter }   from '@angular/core'
import { Criteria }       from '../criteria';
import { FilterResponse } from '../filter-response';
import { FilterService }  from './filter-service';

@Component({
	moduleId: module.id,
    selector: 'criteria',
    templateUrl: './criteria.component.html'
})

export class CriteriaComponent {
	priceAbove : number = null;
	priceBelow : number = null;
	yearlyHigh : number = null;
	yearlyLow  : number = null;
	historicVolatility : number = null;
	listedAfter : Date = null;
	optionable : boolean = false;

	@Output() resultsCompleteEvent:  EventEmitter<FilterResponse> = new EventEmitter<FilterResponse>();

	constructor( private filterService : FilterService) {

	}

	filterClick(offset : number) {
		if (this.priceAbove < 0) {
			this.priceAbove = 0;
		}
		if (this.priceBelow < 0) {
			this.priceBelow = 0;
		}
		if (this.yearlyHigh < 0 && this.yearlyHigh < 1) {
			this.yearlyHigh = 1;
		}
		if (this.yearlyHigh > 99) {
			this.yearlyHigh = 99;
		}
		if (this.yearlyLow < 0 && this.yearlyLow < 1) {
			this.yearlyLow = 1;
		}
		if (this.yearlyLow > 99) {
			this.yearlyLow = 99;
		}



		let crit : Criteria = new Criteria();
		crit.setPriceAbove(this.priceAbove);
		crit.setPriceBelow(this.priceBelow);
		crit.setYearlyHigh(this.yearlyHigh);
		crit.setYearlyLow(this.yearlyLow);
		crit.setHistoricVolatility(this.historicVolatility);
		crit.setListedAfter(this.listedAfter);
		crit.setOptionable(this.optionable);

		if (offset === undefined) {
			crit.setOffset(1);
		} else {
			crit.setOffset(offset);
		}

		let promise : Promise<FilterResponse> = this.filterService.filter(crit);
		promise.then(result => {
			this.resultsCompleteEvent.emit(result);
		});
	}
}