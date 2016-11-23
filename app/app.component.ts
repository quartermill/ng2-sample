import {Component, ViewChild}     from '@angular/core';
import {LoginPanelComponent}      from './login-panel/login-panel.component';
import {LoginCredential}          from './login-credential';
import {NavigationPanelComponent} from './navigation-panel/navigation-panel.component';
import {Http} 	      from '@angular/http'

@Component({
  selector: 'my-app',
  templateUrl: 'app/app.component.html',
  providers: [Http],

  viewProviders: [LoginPanelComponent]
  // directives: [LoginPanelComponent, NavigationPanelComponent]
})


// @Directive({ selector: 'login-panel' })
export class AppComponent { 
	private loginCred : LoginCredential;

	@ViewChild(LoginPanelComponent) loginPanel: LoginPanelComponent; 	

	onLoggedOn(cred : LoginCredential) {
		// console.log("login event received: " + cred.getName());
		this.loginCred = cred;
	}

	onLoggedOff(junk : any) {
		// console.log("logged off");
		this.loginCred = null;
	}
}