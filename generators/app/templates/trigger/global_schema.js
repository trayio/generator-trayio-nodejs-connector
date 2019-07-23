/*
	Global connector schema config.
	Documentation: https://github.com/trayio/falafel#global-message-schemas
	Trigger Documentation: https://github.com/trayio/falafel#trigger-connectors
*/

module.exports = {
	input: {
		// The workflow URL, can also add generic schema inputs (API keys etc) in here
		public_url: {
			type: 'string',
			required: true,
			advanced: true,
			defaultJsonPath: '$.env.public_url',
		},
	},
};
