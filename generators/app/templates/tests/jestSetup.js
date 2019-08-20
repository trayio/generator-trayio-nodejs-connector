const { matchersWithOptions } = require('jest-json-schema');

const Falafel = require('@trayio/falafel');

new Falafel().wrap({ directory: __dirname + '/../', test: true });

expect.extend(
	matchersWithOptions({
		allErrors: true,
	}),
);
