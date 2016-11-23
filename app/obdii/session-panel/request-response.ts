export class RequestResponse {
	private request : String;
	private response : String;

	constructor(request : String, response : String) {
		this.request = request;

		while (response.indexOf("\r") >= 0) {
			response = response.replace("\r", "\n");
		}

		this.response = response;
	}

	getRequest() : String {
		return this.request;
	}

	getResponse() : String {
		return this.response;
	}
}