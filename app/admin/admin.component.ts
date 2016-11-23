import { Component, ViewChild } from '@angular/core'
import { NavigationService }    from '../navigation-panel/navigation.service';
import { SummaryComponent }     from './admin-summary/admin-summary.component';
import { DetailComponent }      from './admin-detail/admin-detail.component';


@Component({
	moduleId: module.id,
    selector: 'admin',
    templateUrl: './admin.component.html'
})

export class AdminComponent {
	private title : string = 'Admin';
	private desc  : string = 'So, what are your clients really doing?';

	@ViewChild(SummaryComponent) summaryComponent: SummaryComponent; 
	@ViewChild(DetailComponent)  detailComponent: DetailComponent; 

	constructor(private navService : NavigationService ) {
	}


	ngAfterContentInit() {
	 	this.navService.identify(this.title, this.desc);
	 	this.summaryComponent.reload();
	}

	rowClickEvent(email : String) {
		// console.log("parent click: " + email);
		this.detailComponent.reload(email);
	}

}