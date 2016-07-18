var Falafel = require('@trayio/falafel');

// Set up the lambda function by wrapping the current directory
var apptalk = new Falafel().wrap({
	directory: __dirname+'/'
});

// Export the apptalk lambda function
exports.apptalk = apptalk;
