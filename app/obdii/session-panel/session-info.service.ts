import {Injectable} from '@angular/core';
import {SessionInfo}           from './session-info';
import { LoginService }   from '../../login.service';
import {Http, Headers, RequestOptions, Response} from '@angular/http'

@Injectable()
export class SessionInfoService {
	constructor(private _http:Http, private loginService : LoginService) {

	}

	getSessionInfo(sessionId : String) : Promise<SessionInfo> {
    	let body = '';
      let headers = this.loginService.createHeaders(false);
  		let options = new RequestOptions({ headers: headers });
  		return this._http.get('/services/obdiiSession?id=' + sessionId, options)
  			.toPromise()
            .then(this.extractResponseData)
            .catch(this.handleError);	
    }

     private extractResponseData(res: Response) {
  		let body  = res.json();
  		// console.log('response body:' + JSON.stringify(body));

		let session : SessionInfo = 
			new SessionInfo(new Date(body.startDate), new Date(body.completeDate));

		let bodyReqs : Array<any> = body.requestResponses;
		for (let i = 0; i < bodyReqs.length; i++) {
			session.addRequestResponse(bodyReqs[i].request, bodyReqs[i].response);	
		}

    	return Promise.resolve(session);     
    }

    private handleError (error: any) {
  		// console.log("got an error condition...");
  		let errMsg = (error.message) ? error.message :
    		error.status ? `${error.status} - ${error.statusText}` : 'Server error';
  		console.error(errMsg); // log to console instead
    	// return Promise.resolve(new Array<SessionListItem>());
	  	return Promise.reject(errMsg);
  	}
}
