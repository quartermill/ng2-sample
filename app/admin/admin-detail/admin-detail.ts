import { Metric } from './metric';

export class AdminDetailResponse {
	email : String;
	totalCount : number;
	metrics : Array<Metric>;

	constructor(email : String, totalCount : number) {
		this.email = email;
		this.totalCount = totalCount;
		this.metrics = new Array<Metric>();
	}

	addMetric(metric : Metric) {
		this.metrics.push(metric);
	}
}