import { Injectable }     from '@angular/core';
import { LoginService }   from '../login.service';
import { LookupRequest }  from './lookup-request';
import { LookupResponse } from './lookup-response';
import { OptionDate }     from './options/option-date';
import { ChainEntry }     from './options/chain-entry';
import { ChainRequest }   from './chain-request';
import {Http, Headers, 
        RequestOptions, 
        Response}         from '@angular/http';

@Injectable()
export class LookupService {

	constructor(private _http:Http, private loginService : LoginService) {
  }

	lookup(request : LookupRequest) : Promise<LookupResponse> {
    	let body = 'lookup=' + JSON.stringify(request);
      let headers = this.loginService.createHeaders(true);
  		let options = new RequestOptions({ headers: headers });

  	return this._http.post('/services/lookup', body, options)
  			.toPromise()
            .then(res => this.extractResponseData(res) )
            .catch(this.handleError);
	}

	private extractResponseData(res: Response) : LookupResponse { 
  		let body = res.json();
  		let response : LookupResponse = new LookupResponse(body.status, body.symbol, body.name, body.last, body.lastDate);
      let bars : Array<any> = body.bars;
      for (let i = 0; i < bars.length; i++) {
        let bar : any = bars[i];
        response.addBar(bar.label, bar.low, bar.open, bar.close, bar.high);
      }
      // console.log("bars: " + bars.length);
    	return response;
  	}

  	private handleError (error: any) {
  		// console.log("got an error condition...");
  		let errMsg = (error.message) ? error.message :
    		error.status ? `${error.status} - ${error.statusText}` : 'Server error';
  		console.error(errMsg); // log to console instead
    	return Promise.reject(errMsg);
	}

  lookupOptionDates(symbol : string) : Promise<Array<OptionDate>> {
      let headers = this.loginService.createHeaders(false);          
      let options = new RequestOptions({ headers: headers });
      return this._http.get('/services/lookup/options/' + symbol, options)
        .toPromise()
            .then(res => this.extractOptionDatesResponseData(res))
            .catch(this.handleError);      

  }

  private extractOptionDatesResponseData(res: Response) : Array<OptionDate> { 
      let body = res.json();
      let response : Array<OptionDate> = []; 
      let inbound : Array<any> = body;
      for (let i = 0; i < inbound.length; i++) {
        let optionDate : OptionDate = new OptionDate(inbound[i].date, inbound[i].type);
        response.push(optionDate);
      }
      return response;
  }

  lookupOptionChain(symbol : string, expDate : Date, last : number) : Promise<Array<ChainEntry>> {
      let request : ChainRequest = new ChainRequest(symbol, expDate);
      let body = 'lookup=' + JSON.stringify(request);
      let headers = this.loginService.createHeaders(true);
      let options = new RequestOptions({ headers: headers });

    return this._http.post('/services/lookup/options', body, options)
        .toPromise()
            .then(res => this.extractChainResponseData(res, last) )
            .catch(this.handleError);

  }

  private extractChainResponseData(res: Response, last : number) : Array<ChainEntry> { 
      let body = res.json();
      let response : Array<ChainEntry> = []; 
      let inbound : Array<any> = body;
      for (let i = 0; i < inbound.length; i++) {
        let entry : ChainEntry = new ChainEntry(last, inbound[i].strike, 
          inbound[i].c_last, inbound[i].c_bid, inbound[i].c_ask, inbound[i].c_volume, inbound[i].c_interest, 
          inbound[i].p_last, inbound[i].p_bid, inbound[i].p_ask, inbound[i].p_volume, inbound[i].p_interest);
        response.push(entry);
      }
      return response;
  }



}