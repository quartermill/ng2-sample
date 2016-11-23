import { Component }           from '@angular/core'
import { OptionDate }          from './option-date';
import { ChainEntry }          from './chain-entry';
import { LookupService }       from '../lookup-service';


@Component({
    moduleId: module.id,
    selector: 'options',
    templateUrl: './options.component.html'
})

export class OptionsComponent {
	public active : boolean = false;
	public selectedDate : Date = null;

	public loaded : boolean = false;
	public symbol : string;
	public last   : number;
	public dates : Array<OptionDate> = [];
	public entries : Array<ChainEntry> = [];

	constructor(private lookupService : LookupService) {

	}

	setActive(active : boolean) {
    	this.active = active;

    	if (this.active && !this.loaded && this.symbol != null) {
    		this.loadDates();
    	}
    }

    setSymbol(symbol : string, last : number) {
    	this.symbol = symbol;
    	this.last = last;
    	this.loaded = false;
    	this.selectedDate = null;
    	this.entries = [];

    	if (this.active) {
    		this.loadDates();
    	}
    }

    clearSymbol() {
    	this.symbol = null;
    	this.loaded = false;
    	this.dates = [];
    	this.selectedDate = null;
    	this.entries = [];
    }

    // from the html template
    selectDate(expDate : Date) {
    	this.selectedDate = expDate;

		let promise : Promise<Array<ChainEntry>> = this.lookupService.lookupOptionChain(this.symbol, this.selectedDate, this.last);
		promise.then(result => {
			this.entries = result;
		}).catch (result => {
			console.log("Server Error: " + result);
			this.entries = [];
		})
    }

    private loadDates() {
		let promise : Promise<Array<OptionDate>> = this.lookupService.lookupOptionDates(this.symbol);
		promise.then(result => {
			this.dates = result;
			if (this.dates.length > 0) {
				this.selectedDate = this.dates[0].date;
				this.selectDate(this.selectedDate);
			} else {
				this.selectedDate = null;
			}
			this.loaded = true;
		}).catch( result => {
			console.log("Server Error: " + result);
		});
    }

    // from the html template
    getClass() : string {
    	return "text-center strike-cell"
    }
}
