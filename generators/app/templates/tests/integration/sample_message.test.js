describe('sampleMessage', () => {
	describe('Given input', () => {
		const input = {
			'#auth': {
				api_key: process.env.API_KEY,
			},
		};
		//This will make an outbound API call
		it('Should return a successful response', () => {
			return falafel.connector.operation(input).then(output => {
				expect(output.body).toEqual({
					result:
						'This is a sample of the response you expect from this message API call. Used for the output schema. Replace this with your own sample JSON.',
				});
			});
		});
	});
});
