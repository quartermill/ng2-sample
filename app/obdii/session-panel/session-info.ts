import {RequestResponse} from './request-response';

export class SessionInfo {
	private startTime : Date;
	private endTime : Date;
	private requestResponse : Array<RequestResponse>;

	constructor(start : Date, end : Date) {
		this.startTime = start;
		this.endTime = end;
		this.requestResponse = [];
	}

	getStartDate() : Date {
		return this.startTime;
	}

	getEndDate() : Date {
		return this.endTime;
	}

	getRecordCount() : number {
		return this.requestResponse.length;
	}

	addRequestResponse(request : String, response : String) {
		let reqResp : RequestResponse = new RequestResponse(request, response);
		this.requestResponse.push(reqResp);
	}

	getRequestResponses() : Array<RequestResponse> {
		return this.requestResponse;
	}
}