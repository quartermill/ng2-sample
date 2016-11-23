import { Component } from '@angular/core'
import { NavigationService } from '../navigation-panel/navigation.service';

@Component({
    selector: 'please-login',
    templateUrl: 'app/please-login/please-login.component.html',
    providers: []
    // directives: []
    
})

export class PleaseLoginComponent {
	private title : string = 'Log In, Please';
	private desc  : string = 'Right....  We\'re gonna have to ask you to go ahead and log in now.';

	constructor(private navService : NavigationService ) {
	}


	ngAfterContentInit() {
	 	this.navService.identify(this.title, this.desc);
	}

}