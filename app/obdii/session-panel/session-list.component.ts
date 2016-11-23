import {Component, Output, EventEmitter}    from '@angular/core';
import {SessionListItem}                    from './session-list-item'

@Component({
	moduleId: module.id,
    selector: 'session-list',
    templateUrl: './session-list.component.html'   
})

export class SessionListComponent { 
	public sessionIds: Array<SessionListItem>;
	public selectedId: SessionListItem;

   @Output() sessionSelectedEvent:  EventEmitter<String> = new EventEmitter<String>();	

	constructor() {
		this.selectedId = new SessionListItem("noId", "Select a Session");
		this.sessionIds = [];
	}

	selectSession(session : SessionListItem) {
		// console.log("Selected Session [" + session + "]");
		this.selectedId = session;
		if (this.selectedId.getRunDate() != "Select a Session") {
			this.sessionSelectedEvent.emit(this.selectedId.getId());
		}
	}

	setSessionList(list : Array<SessionListItem>) {
		this.sessionIds = list; 
		this.selectedId = new SessionListItem("noId", "Select a Session");		
	}
}
