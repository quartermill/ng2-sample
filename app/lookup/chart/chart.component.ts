import {Component}      from '@angular/core'
import { GoogleChart }  from '../../../node_modules/angular2-google-chart/directives/angular2-google-chart.directive';

@Component({
    moduleId: module.id,
    selector: 'chart',
    templateUrl: './chart.component.html'
})

export class ChartComponent {
	public barsLoaded : boolean = false;
    public candle_ChartData = ['Day','Low','Opening value','Closing value','High'];
    public active : boolean = true;

	public candle_ChartOptions = {
         legend: 'none',
         bar: { groupWidth: '100%' }, // Remove space between bars.
         candlestick: {
         	fallingColor: { strokeWidth: 0, fill: '#a52714' }, // red
            risingColor: { strokeWidth: 0, fill: '#0f9d58' }   // green
         }
       };    


    loadBars(bars : Array<any>) {
    	this.candle_ChartData = bars;
		this.barsLoaded = false;
		setTimeout(() => { this.barsLoaded = true; });
    }

    clearBars() {
		console.log('no bars');
		this.candle_ChartData = ['Day','Low','Opening value','Closing value','High'];
		this.barsLoaded = false;					
    }

    setActive(active : boolean) {
    	this.active = active;
    }
}