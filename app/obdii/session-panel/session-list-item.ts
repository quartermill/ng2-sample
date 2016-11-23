
export class SessionListItem {
	private id : String;
	private runDate : String;

	constructor( id : String, runDate : String) {
		this.id = id;
		this.runDate = runDate;
	}

	getId() : String {
		return this.id;
	}

	getRunDate() : String {
		return this.runDate;
	}
}