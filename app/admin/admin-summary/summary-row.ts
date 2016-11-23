
export class SummaryRow {
	email : String;
	lastActivity : Date;
	metric : Map<String, number>;

	constructor(email : String, lastActivity : Date) {
		this.email = email;
		this.lastActivity = lastActivity;

		this.metric = new Map<String, number>();
	}

	get(key : String) : number {
		let value : number =  0;

		if (this.metric.has(key)) {
			value = this.metric.get(key);
		}

		return value;
	}

	put(key : String, value : number) {
		this.metric.set(key, value);
	}

}