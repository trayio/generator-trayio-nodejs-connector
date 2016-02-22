var Falafel = require('@trayio/falafel');

// Start the server by wrapping the current directory
new Falafel().wrap({
	directory: __dirname+'/'
});
