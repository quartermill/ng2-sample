import { Stock } from './stock';

export class FilterResponse {
	status : String;
	hits : number;     // total filter hits; but only 20 are returned
	offset : number;   // 1 based offset/index of the returned set of 20
	stocks : Array<Stock> = [];

	constructor(status : String, hits : number, offset : number) {
		this.status = status;
		this.hits = hits;
		this.offset = offset;
	}

	addStock(stock : Stock) {
		this.stocks.push(stock);
	}
}