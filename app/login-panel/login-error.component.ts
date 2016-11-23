import {Component} from '@angular/core'

@Component({
    selector: 'login-error',
    templateUrl: 'app/login-panel/login-error.component.html'
})

export class LoginErrorComponent { 
	public ErrorMessageIsVisible: boolean;
	public ErrorMessage: String;

	constructor() {
		this.ErrorMessageIsVisible = false;
	}

	showErrorDialog (errorMsg : String) {
		// console.log('Error Dialog should show here');
		this.ErrorMessage = errorMsg;
		this.ErrorMessageIsVisible = true;
	}

	hideErrorDialog() {
		// console.log('Error Dialog show be hidden now');
		this.ErrorMessageIsVisible = false;
	}
}
