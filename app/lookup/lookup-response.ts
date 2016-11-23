export class LookupResponse {
	status : string;
	symbol : string;
	name : string;
	last : number;
	lastDate : Date;
	bars = [];

	constructor(status : string, symbol : string, name : string, last : number, lastDate : Date) {
		this.status = status;
		this.symbol = symbol;
		this.name = name;
		this.last = last;
		this.lastDate = lastDate;

		let header = ['Date','Low','Opening value','Closing value','High'];
		this.bars.push(header);
	}

	addBar(label : string, low : number, open : number, close : number, high : number) {
		let node = [label, low, open, close, high];
		this.bars.push(node);
	}
}