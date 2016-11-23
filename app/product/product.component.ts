import {Component} from '@angular/core'
import { NavigationService } from '../navigation-panel/navigation.service';

@Component({
    selector: 'product',
    templateUrl: 'app/product/product.component.html',
    providers: []
    // directives: []
    
})

export class ProductComponent {
	private title : string = 'QuarterMill Software';
	private desc  : string = 'A technical firm dedicated to solving problems through quality software delivery.';

	constructor(private navService : NavigationService ) {
	}


	ngAfterContentInit() {
	 	this.navService.identify(this.title, this.desc);
	}

}