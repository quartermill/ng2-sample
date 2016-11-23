import {Component, Output, EventEmitter} from '@angular/core'
import { Criteria } from '../criteria';

@Component({
	moduleId: module.id,
    selector: 'name-filter',
    templateUrl: './name-filter.component.html',
    providers: []
    
})

export class NameFilterComponent {
   @Output() filterClickEvent:  EventEmitter<any> = new EventEmitter<any>();

	constructor( ) {
	}

	filterClick() {
		this.filterClickEvent.emit();
	}
}