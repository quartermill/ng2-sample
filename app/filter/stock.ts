export class Stock {
	symbol : String;
	name   : String;
	close  : number;

	constructor(symbol : String, name : String, close : number) {
		this.symbol = symbol;
		this.name = name;
		this.close = close;

		if (this.close == null) {
			this.close = 0;
		}
	}
}