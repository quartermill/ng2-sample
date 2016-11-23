import { Component }           from '@angular/core';
import { AdminDetailResponse } from './admin-detail';
import { AdminDetailService }  from './admin-detail.service';

@Component({
	moduleId: module.id,
    selector: 'admin-detail',
    templateUrl: './admin-detail.component.html'
    // providers: [AdminDetailService]
    // directives: []
    
})

export class DetailComponent {
	selectedUser : AdminDetailResponse;

	constructor(private adminDetailService : AdminDetailService ) {
		this.selectedUser = null;
	}

	reload(email : String) {

		let promise : Promise<AdminDetailResponse> = this.adminDetailService.callDetailService(email);
		promise.then(result => {
			this.selectedUser = result;
		}).catch(result => {
			this.selectedUser = null;
		});

	}
}
