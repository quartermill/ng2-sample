import { SummaryRow } from './summary-row';

export class SummaryResponse {
	rows : Array<SummaryRow> = new Array<SummaryRow>();

	constructor() {

	}

	addRow(row : SummaryRow) {
		this.rows.push(row);
	}

}