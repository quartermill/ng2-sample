import {Component, ViewChild, Output, EventEmitter} from '@angular/core'
import {LoginService} from '../login.service'
import {LoginCredential} from '../login-credential';
import {LoginErrorComponent} from './login-error.component';

@Component({
    selector: 'login-panel',
    templateUrl: 'app/login-panel/login-panel.component.html',
    providers: []
    // directives: [LoginErrorComponent]
    
})

export class LoginPanelComponent { 
	public IsLoggedIn : String;
	public UserName : String;

   @ViewChild(LoginErrorComponent) errorMsg: LoginErrorComponent; 

   @Output() loggedOnEvent:  EventEmitter<LoginCredential> = new EventEmitter<LoginCredential>();
   @Output() loggedOffEvent: EventEmitter<any> = new EventEmitter();

	constructor(private loginService : LoginService) {
		this.IsLoggedIn = "no";
	}

	logIn(formData : any) {
		let promise : Promise<LoginCredential> = this.loginService.login(formData.email, formData.password);
		promise.then(cred => {
			if (cred.loginSucceeded()) {
				this.IsLoggedIn = "yes";
				this.UserName = cred.getName();
				this.loggedOnEvent.emit(cred);
			} else {
				// console.log(cred.getErrorMessage());
				this.errorMsg.showErrorDialog(cred.getErrorMessage());
			}
		});
	}

	logOut()  {
		this.loginService.logout().then(x => {
			this.IsLoggedIn = "no";
			this.loggedOffEvent.emit(null);
		});
	}
}