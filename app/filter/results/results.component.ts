import { Component, EventEmitter, 
	     Output }              from '@angular/core';
import { Router } from '@angular/router';
import { FilterResponse }      from '../filter-response';
import { Stock }               from '../stock';

@Component({
	moduleId: module.id,
    selector: 'results',
    templateUrl: './results.component.html',
    providers: []
})

export class ResultsComponent {
	@Output() paginationEvent:  EventEmitter<number> = new EventEmitter<number>();

	responseError : boolean;
	errorMessage : String;
	hits : number;
	pagehits : number = 0;
	stocks : Array<Stock>;

	// toolbar
	leftDisabled : String;
	rightDisabled : String;
	active : Array<String> = ["", "", "", "", ""];
	realIndex : number;

	constructor( private router: Router) {
		this.responseError = true;
		this.errorMessage = 'Enter some criteria and hit the filter button...';
	}

	filterComplete(response : FilterResponse) {
		if (response.status == 'OK') {
			this.hits = response.hits;
			this.pagehits = 0;
			this.stocks = response.stocks;

			this.leftDisabled = "disabled";
			this.rightDisabled = "";
			this.realIndex = 1;

			let indeces = [0, 1, 2, 3, 4];
			for (let index of indeces) {
				// console.log(index + ' : ' + response.offset + ' : ' + ((response.offset-1) % 5));

				if ((response.offset-1) % 5 == index) {
					this.active[index] = "active";
					if (response.offset > 5) {
						this.leftDisabled = "";
						this.realIndex = Math.floor((response.offset-1) / 5) * 5 + 1;
					}
					this.pagehits = Math.min(response.offset * 20, response.hits);
					if (this.pagehits == response.hits) {
						this.rightDisabled = "disabled";
					}
				} else {
					this.active[index] = "";
					if (this.pagehits == response.hits) {
						this.active[index] = "disabled";
					}
				}
			}


			this.responseError = false;

		} else {
			this.errorMessage = response.status;
			this.stocks = null;
			this.responseError = true;
		}
	}

	indexClick(index : number) {
		if (this.active[index] == "") {
			// console.log('internal index click ' + (this.realIndex + index));
			this.paginationEvent.emit(this.realIndex + index);
		}
	}

	previousClick() {
		if (this.leftDisabled == "" && this.realIndex > 1) {
			// console.log('internal previous click ');
			this.paginationEvent.emit(this.realIndex - 5);
		}
	}

	nextClick() {
		if (this.rightDisabled == "") {
			// console.log('internal next click ');
			this.paginationEvent.emit(this.realIndex + 5);
		}
	}

	rowClick(symbol : string) {
		let link = ['/lookup', symbol];
		this.router.navigate(link);
	}
}