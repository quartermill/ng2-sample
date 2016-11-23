import {Component, ViewChild}  from '@angular/core';
import {SessionListComponent}  from './session-list.component';
import {SessionListService}    from './session-list.service';
import {SessionInfoService}    from './session-info.service';
import {SessionInfo}           from './session-info';
import {SessionListItem}       from './session-list-item'
import {RequestResponse}       from './request-response';

@Component({
	moduleId: module.id,
    selector: 'session-panel',
    templateUrl: './session-panel.component.html'
})

export class SessionPanelComponent { 
	public IsLoggedIn : String;
	public sessionInfo : SessionInfo;

	@ViewChild(SessionListComponent) listComponent: SessionListComponent; 

	constructor(private sessionListService : SessionListService, private sessionInfoService : SessionInfoService) {
		this.IsLoggedIn = "no";
	}

	onLoggedOn() {
		this.IsLoggedIn = "yes";

		let promise : Promise<Array<SessionListItem>> = this.sessionListService.getSessionList();
		promise.then(list => {
			this.listComponent.setSessionList(list);
		});

	}

	onLoggedOff() {
		this.IsLoggedIn = "no";

		let list : Array<SessionListItem> = [];	
		this.listComponent.setSessionList(list);	
		this.sessionInfo = null;
	}

	sessionSelectedEvent(sessionId : String) {
		// console.log("Selcted id [" + sessionId + "]");
		let promise : Promise<SessionInfo> = this.sessionInfoService.getSessionInfo(sessionId);
		promise.then(obj => {
			this.sessionInfo = obj;
		});
	}
}