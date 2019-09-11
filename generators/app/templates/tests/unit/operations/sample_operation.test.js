const nock = require('nock');
describe('sampleOperation', () => {
	describe('Given input params', () => {
		//This is the input you receive from the UI
		const input = {
			'#auth': {},
		};

		//Set up your api mock https://github.com/nock/nock
		nock('https://myApiUrl.com')
			.get('/somepath') //Specify the verb and the URI you are trying to access
			.reply(function() {
				//Mock the response of the api
				return {};
			});

		it('Should format the request correctly', () => {
			return falafel.connector.operation(input).then(output => {
				expect(output).toEqual({});
			});
		});
	});
});
