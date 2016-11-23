export class ChainEntry {
	strike : number;

	c_last : number;
	c_bid  : number;
	c_ask  : number;
	c_volume : number;
	c_interest : number;

	p_last : number;
	p_bid  : number;
	p_ask  : number;
	p_volume : number;
	p_interest : number;

	callClass : string;
	putClass  : string;

	constructor(last : number, strike : number, c_last : number, c_bid : number, c_ask : number, c_volume : number, c_interest : number, 
		p_last : number, p_bid : number, p_ask : number, p_volume : number, p_interest : number) 
	{
		this.strike = strike;
		this.c_last     = c_last;
		this.c_bid      = c_bid;
		this.c_ask      = c_ask;
		this.c_volume   = c_volume;
		this.c_interest = c_interest;
		this.p_last     = p_last;
		this.p_bid      = p_bid;
		this.p_ask      = p_ask;
		this.p_volume   = p_volume;
		this.p_interest = p_interest;

		if (last >= this.strike) {
			this.callClass = "text-center in-money";
		} else {
			this.callClass = "text-center";
		}

		if (last <= this.strike) {
			this.putClass = "text-center in-money";
		} else {
			this.putClass = "text-center";
		}


	}

}