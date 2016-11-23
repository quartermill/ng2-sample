import {Injectable} from '@angular/core';
import {SessionListItem} from './session-list-item';
import { LoginService }   from '../../login.service';
import {Http, Headers, RequestOptions, Response} from '@angular/http';

@Injectable()
export class SessionListService {

	constructor(private _http:Http, private loginService : LoginService) {

	}

  getSessionList() : Promise<Array<SessionListItem>> {
    let body = '';
    let headers = this.loginService.createHeaders(false);
  	let options = new RequestOptions({ headers: headers });
  	return this._http.get('/services/obdiiList', options)
  			.toPromise()
            .then(this.extractResponseData)
            .catch(this.handleError);
  }

  private extractResponseData(res: Response) {
  	let body : Array<any> = res.json();
  	// console.log('response body:' + JSON.stringify(body));

  	let items : Array<SessionListItem> = [];
  	for (let i = 0; i < body.length; i++) {
  		//console.log('object: ' + JSON.stringify(body[i]));
  		items.push(new SessionListItem(body[i].id, body[i].runDate));
  	}

    return Promise.resolve(items);
  }

  private handleError (error: any) {
  	// console.log("got an error condition...");
  	let errMsg = (error.message) ? error.message :
    	error.status ? `${error.status} - ${error.statusText}` : 'Server error';
  	console.error(errMsg); // log to console instead
    return Promise.resolve(new Array<SessionListItem>());
	  	// return Promise.reject(errMsg);
  }

}