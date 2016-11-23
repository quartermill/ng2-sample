export class ChainRequest {
	symbol : string;
	expDate : Date;

	constructor(symbol : string, expDate : Date) {
		this.symbol = symbol;
		this.expDate = expDate;
	}
}