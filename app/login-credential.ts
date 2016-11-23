export class LoginCredential {
	private firstName : String;
	private lastName : String;
	private errorMessage : String;

	constructor(fname : String, lname : String, errMsg : String = 'null') {
		this.firstName = fname;
		this.lastName = lname;
		this.errorMessage = errMsg;
	}

	getName() : String {
		return this.firstName + " " + this.lastName;
	}

	getErrorMessage() : String {
		return this.errorMessage;
	}

	loginSucceeded() : boolean {
		return (this.errorMessage == 'null');
	}

}