import { Injectable, EventEmitter }  from '@angular/core';
import { NavigationBean }            from './navigation-bean';

@Injectable()
export class NavigationService {
	navChangeEvent : EventEmitter<NavigationBean> = new EventEmitter<NavigationBean>(true);

	subscribe(recipient : any) {
		this.navChangeEvent.subscribe(recipient);
	}

	identify(title: string, desc : string) {
		this.navChangeEvent.emit(new NavigationBean(title, desc));
	}
}