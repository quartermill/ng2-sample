export class Criteria {
	priceAbove : number = null;
	priceBelow : number = null;
	yearlyHigh : number = null;
	yearlyLow  : number = null;
	historicVolatility : number = null;
	listedAfter : Date = null;
	optionable : boolean = false;
	offset     : number = 1;

	setPriceAbove(value : number) {
		this.priceAbove = value;
	}

	setPriceBelow(value : number) {
		this.priceBelow = value;
	}

	setYearlyHigh(value : number) {
		this.yearlyHigh = value;
	}

	setYearlyLow(value : number) {
		this.yearlyLow = value;
	}

	setListedAfter(value : Date) {
		this.listedAfter = value;
	}

	setOptionable(value : boolean) {
		this.optionable = value;
	}

	setOffset(value : number) {
		this.offset = value;
	}

	setHistoricVolatility(value : number) {
		this.historicVolatility = value;
	}
}