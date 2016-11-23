import {Component} from '@angular/core'
import { NavigationService } from '../navigation-panel/navigation.service';
import { DashboardService } from './dashboard.service'
import { DashboardLink } from './dashboard-link';

@Component({
    selector: 'dashboard',
    templateUrl: 'app/dashboard/dashboard.component.html'
    // providers: [DashboardService]
    // directives: []
    
})

export class DashboardComponent {
	links : Array<DashboardLink> = null;

	private title : string = 'Dashboard';
	private desc  : string = 'Links to all of your stuff.';

	constructor(private navService : NavigationService, private dashboardService : DashboardService ) {
	}


	ngAfterContentInit() {
	 	this.navService.identify(this.title, this.desc);

	 	let promise : Promise<Array<DashboardLink>> = this.dashboardService.loadDashboardLinks();
		promise.then(result => {
			this.links = result;
		}).catch( result => {
			console.log('Error calling dashboard service.');
		})
	}

}