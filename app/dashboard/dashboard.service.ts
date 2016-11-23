import { Injectable }     from '@angular/core';
import { DashboardLink }  from './dashboard-link';
import { LoginService }    from '../login.service';
import { Http, Headers, 
         RequestOptions, 
         Response}         from '@angular/http';

@Injectable()
export class DashboardService {


	constructor(private _http:Http, private loginService : LoginService) {
  	}

	loadDashboardLinks() : Promise<Array<DashboardLink>>  {
      let headers = this.loginService.createHeaders(false);      
  		let options = new RequestOptions({ headers: headers });
  		return this._http.get('/services/dashboard', options)
  			.toPromise()
            .then(res => this.extractResponseData(res))
            .catch(this.handleError);  	

		// let links : Array<DashboardLink> = [];
		// links.push(new DashboardLink('/filter', 'Stock Filter'));
		// links.push(new DashboardLink('/obdii', 'OBDII Detail Viewer'));
		// return Promise.resolve(links);
	}

	private extractResponseData(res: Response) : Array<DashboardLink> { 
  		let body = res.json();
  		let response : Array<DashboardLink> = [];
  		let rows : Array<any> = body;

  		for (let i = 0; i < rows.length; i++) {
        	let link : DashboardLink = new DashboardLink(rows[i].link, rows[i].description);
  			response.push(link);
  		}
    	return response;
  	}

  	  private handleError (error: any) {
  		// console.log("got an error condition...");
  		let errMsg = (error.message) ? error.message :
    		error.status ? `${error.status} - ${error.statusText}` : 'Server error';
  		console.error(errMsg); // log to console instead
    	return Promise.reject(errMsg);
	}  	
}