import {Component, ViewChild}  from '@angular/core'
import { ActivatedRoute, 
	     Params }              from '@angular/router';
import { NavigationService }   from '../navigation-panel/navigation.service';
import { LookupService }       from './lookup-service';
import { LoginService }        from '../login.service';
import { LookupRequest }       from './lookup-request';
import { LookupResponse }      from './lookup-response';
import { ChartComponent }      from './chart/chart.component';
import { OptionsComponent }    from './options/options.component';

@Component({
	moduleId: module.id,
    selector: 'lookup',
    templateUrl: './lookup.component.html'
})

export class LookupComponent {
	private title : string = 'Stock Lookup';
	private desc  : string = '';
	private tabKey    : string = 'lookup-tab';
	private symbolKey : string = 'lookup-symbol';

	symbol : string = '';
	loadedSymbol : string;
	status : string = '';
	name : string;
	last : number;
	lastDate : Date;

	selectedTab : string = 'Chart';
	active : Array<String> = ["active", ""];

	 @ViewChild(ChartComponent)   chartComponent: ChartComponent; 
	 @ViewChild(OptionsComponent) optionsComponent: OptionsComponent; 

	constructor(private navService : NavigationService, 
		private lookupService : LookupService, 
		private loginService : LoginService,
		private route: ActivatedRoute ) {
	}


	ngAfterContentInit() {
	 	this.navService.identify(this.title, this.desc);
	}

	ngOnInit(): void {
		this.selectTab(this.loginService.getProp(this.tabKey, "Chart"));

		let initialSymbol : string = this.loginService.getProp(this.symbolKey, "");

  		this.route.params.forEach((params: Params) => {
    		let id = params['symbol'];
    		if (id != null) {
    			initialSymbol = id;
    		} 
  		});

  		if (initialSymbol != "") {
  			this.symbol = initialSymbol;
  		    this.lookupClick();
  		}
	}	

	lookupClick() {
		let promise : Promise<LookupResponse> = this.lookupService.lookup(new LookupRequest(this.symbol));
		promise.then(result => {
			if (result.status == 'OK') {
				this.loginService.setProp(this.symbolKey, result.symbol);
				this.status = result.status;
				this.symbol = result.symbol;
				this.loadedSymbol = result.symbol;
				this.name = result.name;
				this.last = result.last;
				this.lastDate = result.lastDate;

				if (result.bars.length > 1) {
					this.chartComponent.loadBars(result.bars);
				} else {
					this.chartComponent.clearBars();
				}
				this.optionsComponent.setSymbol(this.symbol, this.last);
			} else {
				this.status = result.status;
				this.chartComponent.clearBars();
				this.optionsComponent.clearSymbol();
			}
		}).catch( result => {
			console.log("Server Error: " + result);
			this.status = "Server Error";
			this.chartComponent.clearBars();
			this.optionsComponent.clearSymbol();
		});
	}

	selectTab(choice : string) {
		if (this.selectedTab != choice) {
			this.selectedTab = choice;
			this.loginService.setProp(this.tabKey, this.selectedTab);
			if (this.selectedTab == 'Chart') {
				this.active[0] = "active";
				this.active[1] = "";
				this.optionsComponent.setActive(false);
				this.chartComponent.setActive(true);
			} else if (this.selectedTab == 'Options') {
				this.active[0] = "";
				this.active[1] = "active";
				this.chartComponent.setActive(false);
				this.optionsComponent.setActive(true);
			} else {
				console.log(choice + " ??");
			}
		}
	}
}