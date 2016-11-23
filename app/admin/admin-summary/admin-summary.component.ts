import { Component, Output,
		  EventEmitter      }  from '@angular/core'
import { SummaryResponse }     from './summary-response';   
import { AdminSummaryService } from './admin-summary.service';

@Component({
	moduleId: module.id,
    selector: 'admin-summary',
    templateUrl: './admin-summary.component.html',
    // providers: [AdminSummaryService]
    // directives: []
    
})

export class SummaryComponent {
	summary : SummaryResponse;

	@Output() rowClickEvent:  EventEmitter<String> = new EventEmitter<String>();


	constructor(private summaryService : AdminSummaryService ) {
		this.summary = null;
	}


	reload() {
		let promise : Promise<SummaryResponse> = this.summaryService.callSummaryService();
		promise.then(result => {
			this.summary = result;
		});
	}

	rowClick(email : String) {
		this.rowClickEvent.emit(email);
	}
}
