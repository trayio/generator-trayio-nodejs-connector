const Falafel = require('@trayio/falafel');
// Set up the lambda function by wrapping the current directory
const apptalk = new Falafel().wrap({
	directory: `${__dirname}/`,
});

// Export the apptalk lambda function
exports.apptalk = apptalk;
