require('dotenv').config(); //Inject environment variables
describe('sampleMessage', () => {
	describe('Given input', () => {
		const input = {
			'#auth': {
				api_key: process.env.API_KEY,
			},
		};
		//This will make an outbound API call
		it('Should return a successful response', () => {
			falafel.connector.operation(input).then(output => {
				expect(output.body).toEqual({
					foo: 'bar',
				});
			});
		});
	});
});
