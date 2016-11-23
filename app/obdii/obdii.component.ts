import {Component, ViewChild}  from '@angular/core'
import { NavigationService }   from '../navigation-panel/navigation.service';
import {LoginCredential}       from '../login-credential';
import {SessionPanelComponent} from './session-panel/session-panel.component';
import {LoginService}          from '../login.service'



@Component({
	moduleId: module.id,
    selector: 'obdii',
    templateUrl: './obdii.component.html',
    providers: []
    
})

export class ObdiiComponent {
	private loginCred : LoginCredential;
	private title : string = 'OBDII Detail Viewer';
	private desc  : string = 'View raw request and responses from the OBDII port of your vehicle.';

	@ViewChild(SessionPanelComponent) sessionPanel: SessionPanelComponent; 	

	constructor(private navService : NavigationService, private loginService : LoginService ) {
	}


	ngAfterContentInit() {
	 	this.navService.identify(this.title, this.desc);
	 	if (this.loginService.isLoggedOn()) {
	 		this.onLoggedOn(this.loginService.getLoginCredential());
	 	} else {
	 		this.onLoggedOff(null);
	 	}
	}

	onLoggedOn(cred : LoginCredential) {
		// console.log("login event received: " + cred.getName());
		this.loginCred = cred;
		this.sessionPanel.onLoggedOn();
	}

	onLoggedOff(junk : any) {
		// console.log("logged off");
		this.loginCred = null;
		this.sessionPanel.onLoggedOff();
	}	

}