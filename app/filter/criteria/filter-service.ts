import { Injectable }     from '@angular/core';
import { Stock }          from '../stock';
import { Criteria }       from '../criteria';
import { FilterResponse } from '../filter-response';
import { LoginService }   from '../../login.service';
import {Http, Headers, 
        RequestOptions, 
        Response}         from '@angular/http';

@Injectable()
export class FilterService {

	constructor(private _http:Http, private loginService : LoginService) {
  }

	filter(crit : Criteria) : Promise<FilterResponse> {
    	let body = 'criterion=' + JSON.stringify(crit);
      let headers = this.loginService.createHeaders(true);
  		let options = new RequestOptions({ headers: headers });

  	return this._http.post('/services/filter', body, options)
  			.toPromise()
            .then(res => this.extractResponseData(res) )
            .catch(this.handleError);
	}

	private extractResponseData(res: Response) : FilterResponse { 
  		let body = res.json();
  		let response : FilterResponse = new FilterResponse(body.status, body.hits, body.offset);
  		let stocks : Array<any> = body.stocks;

  		for (let i = 0; i < stocks.length; i++) {
  			response.addStock(new Stock(stocks[i].symbol, stocks[i].name, stocks[i].close));
  		}
    	return response;
  	}

  	private handleError (error: any) {
  		// console.log("got an error condition...");
  		let errMsg = (error.message) ? error.message :
    		error.status ? `${error.status} - ${error.statusText}` : 'Server error';
  		console.error(errMsg); // log to console instead
    	return Promise.resolve(new FilterResponse('Server Error', 0, 1));
	}
}