module.exports = {
	input: {
		public_url: {
			type: 'string',
			required: true,
			advanced: true,
			defaultJsonPath: '$.env.public_url',
		},
	},
};
