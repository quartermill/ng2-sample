import { Injectable }           from '@angular/core';
import { CanActivate, Router,
         ActivatedRouteSnapshot,
         RouterStateSnapshot }  from '@angular/router';
import { LoginService }         from './login.service';

@Injectable()
export class AuthGuard implements CanActivate {
	constructor(private loginService : LoginService, private router : Router) {
	}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
  	if (this.loginService.isLoggedOn()) {
  		return true;
  	}

  	this.loginService.setRedirectUrl(state.url);

  	this.router.navigate(['/please-login']);
    return false
  }
}