const nock = require('nock');

//The operation you are testing
describe('sampleMessage', () => {
	//Each time input changes you should specify a different describe block
	describe('Given input params', () => {
		//Make sure to specifiy required parameters
		const input = {
			'#auth': {
				api_key: 'someApiKey',
			},
		};
		//Intercept any request to the base url and store what request body and headers were
		nock('https://baseUrl')
			.get(`/path`)
			.reply(function(uri, body) {
				reqBody = reqBody;
				reqHeaders = this.req.headers;
				//Return the response we would expect from this API
				return { someFormattedResponse: 'someResponse' };
			});
		let reqBody;
		let reqHeaders;

		//Here we can assert that the right request was made and any formatting was done correctly
		it('Should format the request correctly', () =>
			falafel.connector.operation(input).then(output => {
				expect(reqBody).toEqual({
					foo: 'bar',
				});
				expect(reqHeaders).toEqual({
					foo: 'bar',
				});
				expect(output).toEqual({
					response: 'someResponse',
				});
			}));
	});
});
