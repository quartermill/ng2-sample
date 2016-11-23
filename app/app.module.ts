import { NgModule }           from '@angular/core';
import { HttpModule }         from '@angular/http'
import { BrowserModule }      from '@angular/platform-browser';
import { FormsModule }        from '@angular/forms';

import { AppComponent }       from './app.component'; 

import { LoginPanelComponent }     from './login-panel/login-panel.component';
import { LoginErrorComponent }     from './login-panel/login-error.component';

import { NavigationPanelComponent} from './navigation-panel/navigation-panel.component';
import { NavigationService }       from './navigation-panel/navigation.service';

import { ProductComponent }     from './product/product.component';
import { ContactComponent }     from './contact/contact.component';
import { PleaseLoginComponent } from './please-login/please-login.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardService }   from './dashboard/dashboard.service';

import { AuthGuard }          from './auth-guard.service';
import { LoginService }       from './login.service';

import { AppRoutingModule }   from './app.routing';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    LoginPanelComponent,
    LoginErrorComponent,

    NavigationPanelComponent,
    ProductComponent,
    ContactComponent,
    DashboardComponent,
    PleaseLoginComponent
  ],
  providers: [
    NavigationService, 
    LoginService,
    AuthGuard,
    DashboardService,
  ],
  bootstrap: [ AppComponent ]
})

export class AppModule {
}