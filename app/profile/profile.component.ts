import {Component} from '@angular/core'
import { NavigationService } from '../navigation-panel/navigation.service';

@Component({
  moduleId: module.id,
  selector: 'profile',
    templateUrl: './profile.component.html',
    providers: []
    
})

export class ProfileComponent {
	private title : string = 'User Profile';
	private desc  : string = 'A little bit about you...';

	constructor(private navService : NavigationService) {
	}


	ngAfterContentInit() {
	 	this.navService.identify(this.title, this.desc);
	}

}