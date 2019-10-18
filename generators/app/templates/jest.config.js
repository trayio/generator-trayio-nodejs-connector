// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html
const path = require('path');

module.exports = {
	// A list of paths to modules that run some code to configure or set up the testing framework before each test.
	setupFilesAfterEnv: [path.join(__dirname, 'tests/setup.js')],

	// Automatically clear mock calls and instances between every test
	clearMocks: true,

	// The directory where Jest should output its coverage files
	coverageDirectory: 'coverage',

	// Use this configuration option to add custom reporters to Jest
	reporters: ['default'],

	// The test environment that will be used for testing
	testEnvironment: 'node',

	// Indicates whether each individual test should be reported during the run
	verbose: true,

	// Ignores coverage information for test files
	coveragePathIgnorePatterns: [, '/tests/']
};
