import {Injectable }      from '@angular/core';
import {LoginCredential}  from './login-credential';
import {Http, Headers, 
        RequestOptions, 
        Response}         from '@angular/http';
import { Router }         from '@angular/router';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class LoginService {
  private devMode : boolean = true;
  private version : string = "v1.02";  // MANUALLY UPDATE VERSION FOR NOW
  private loggedOn : boolean;
  private redirectUrl : string;
  private cred : LoginCredential;

  private keys : Map<string, string> = new Map<string, string>();

  constructor(private _http:Http, private router : Router) {
    this.loggedOn = false;
    this.redirectUrl = "";
    this.cred = null;
  }

  setProp(key : string, value : string) {
      this.keys.set(key, value);  
  }

  getProp(key : string, defaultValue : string) {
      if (this.keys.has(key)) {
        return this.keys.get(key);
      }
      return defaultValue;
  }

  isDevMode() : boolean {
    return this.devMode;
  }

  createHeaders(isPost : boolean) : Headers {
    let headers = new Headers();

    if (isPost) {
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
    }

    if (this.isDevMode()) {
      headers.append('x-forwarded-for', 'DEV MODE');
    }

    return headers;
  }

  getVersion() : string {
    return this.version;
  }

  isLoggedOn() : boolean {
    return this.loggedOn;
  }

  getLoginCredential() : LoginCredential {
    return this.cred;
  }

  setRedirectUrl(url : string)  {
    this.redirectUrl = url;
  }

  login(email : String, password : String) : Promise<LoginCredential> {
    let body = 'email=' + email + '&password=' + password;
    let headers = this.createHeaders(true);
  	let options = new RequestOptions({ headers: headers });

  	return this._http.post('/services/authenticate', body, options)
  			.toPromise()
            .then(res => this.extractLoginData(res) )
            .catch(this.handleError);
  }

  private extractLoginData(res: Response) : LoginCredential { 
    this.loggedOn = true;
    if (this.redirectUrl != "") {
       let url : string = this.redirectUrl;
       this.redirectUrl = "";
       this.router.navigate([url]);
    }

  	let body = res.json();
    this.cred = new LoginCredential(body.firstName, body.lastName);
    return this.cred;
  }

  private handleError (error: any) {
  	let errMsg = (error.message) ? error.message :
    	error.status ? `${error.status} - ${error.statusText}` : 'Server error';
  	console.error(errMsg); // log to console instead
    return Promise.resolve(new LoginCredential("login failed", "", "Unable to successfully log on with those credentials."));
  }

  logout() : Promise<String> {
    this.loggedOn = false;
    this.cred = null;

    let headers = this.createHeaders(false);
    let options = new RequestOptions({ headers: headers });

    return this._http.get('/services/logout', options)
        .toPromise()
            .then(res => { return "ok"; } )
            .catch(this.handleLogoutError);
  }

  private handleLogoutError (error: any) {
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Promise.resolve("ok");
  }
}