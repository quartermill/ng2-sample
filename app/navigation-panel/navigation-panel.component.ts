import {Component}         from '@angular/core'
import {NavigationService} from './navigation.service';
import { NavigationBean }  from './navigation-bean';
import { LoginService }    from '../login.service';

@Component({
    selector: 'navigation-panel',
    templateUrl: 'app/navigation-panel/navigation-panel.component.html',
    providers: []
    // directives: []
    
})

export class NavigationPanelComponent {
	navTitle : string = 'Default Nav Info'
	navContent : string = 'Insert a sentence or two here to explain a bit about this compoent.';
	version : string;

	constructor(private navService : NavigationService, private loginService : LoginService ) {
		this.navService.subscribe((bean) => {this.onNavChange(bean)});
		this.version = this.loginService.getVersion();
	}

	onNavChange(bean : NavigationBean) {
		this.navTitle = bean.title;
		this.navContent = bean.desc;
	}
} 