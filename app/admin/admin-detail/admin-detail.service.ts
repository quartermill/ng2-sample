import { Injectable }      from '@angular/core';
import { LoginService }    from '../../login.service';
import { Http, Headers, 
         RequestOptions, 
         Response}         from '@angular/http';
import { AdminDetailResponse } from './admin-detail';   
import { Metric }              from './metric';

@Injectable()
export class AdminDetailService {

	constructor(private _http:Http, private loginService : LoginService) {
  }


  	callDetailService(email : String) : Promise<AdminDetailResponse> {
      let headers = this.loginService.createHeaders(false);          
  		let options = new RequestOptions({ headers: headers });
  		return this._http.get('/services/admin/detail/' + email, options)
  			.toPromise()
            .then(res => this.extractResponseData(res))
            .catch(this.handleError);  		

  		// return Promise.resolve(new AdminDetailResponse());
  	}

	private extractResponseData(res: Response) : AdminDetailResponse { 
  		let body = res.json();
  		let response : AdminDetailResponse = new AdminDetailResponse(body.email, body.totalCount);
  		let rows : Array<any> = body.metrics;

  		for (let i = 0; i < rows.length; i++) {
  			response.addMetric(new Metric(rows[i].key, new Date(rows[i].date)));
  		}
    	return response;
  	}

  	private handleError (error: any) {
  		// console.log("got an error condition...");
  		let errMsg = (error.message) ? error.message :
    		error.status ? `${error.status} - ${error.statusText}` : 'Server error';
  		console.error(errMsg); // log to console instead
    	return Promise.resolve(new AdminDetailResponse(null, 0));
	}  	
}
