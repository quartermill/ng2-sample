import {Component} from '@angular/core'
import { NavigationService } from '../navigation-panel/navigation.service';

@Component({
    selector: 'contact',
    templateUrl: 'app/contact/contact.component.html',
    providers: []
    // directives: []
    
})

export class ContactComponent {
	private title : string;
	private desc  : string;


	constructor(private navService : NavigationService) {
		this.title = 'QuarterMill Software'
		this.desc = 'Contact us...'
	}

	ngAfterContentInit() {
	 	this.navService.identify(this.title, this.desc);	 	
	}

}