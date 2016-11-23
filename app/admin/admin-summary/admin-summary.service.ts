import { Injectable }      from '@angular/core';
import { LoginService }    from '../../login.service';
import { Http, Headers, 
         RequestOptions, 
         Response}         from '@angular/http';
import { SummaryResponse } from './summary-response';   
import { SummaryRow }      from './summary-row';     

@Injectable()
export class AdminSummaryService {

	constructor(private _http:Http, private loginService : LoginService) {
  	}


  	callSummaryService() : Promise<SummaryResponse> {
      let headers = this.loginService.createHeaders(false);      
  		let options = new RequestOptions({ headers: headers });
  		return this._http.get('/services/admin/summary', options)
  			.toPromise()
            .then(res => this.extractResponseData(res))
            .catch(this.handleError);  		

  		// return Promise.resolve(new SummaryResponse());
  	}

	private extractResponseData(res: Response) : SummaryResponse { 
  		let body = res.json();
  		let response : SummaryResponse = new SummaryResponse();
  		let rows : Array<any> = body;

  		for (let i = 0; i < rows.length; i++) {
        // console.log('input row ' + i);
        let row : SummaryRow = new SummaryRow(rows[i].email, new Date(rows[i].lastActivity));
        let metrics : Array<any> = rows[i].values;

        for (let k = 0; k < metrics.length; k++) {
           // console.log('mapping found key [' + metrics[k].metric + ']');
           row.put(metrics[k].metric, metrics[k].count);
        }  
  			response.addRow(row);
  		}
    	return response;
  	}

  	private handleError (error: any) {
  		// console.log("got an error condition...");
  		let errMsg = (error.message) ? error.message :
    		error.status ? `${error.status} - ${error.statusText}` : 'Server error';
  		console.error(errMsg); // log to console instead
    	return Promise.resolve(new SummaryResponse());
	}  	
}
