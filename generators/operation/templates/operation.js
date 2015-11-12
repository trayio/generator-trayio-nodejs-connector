
// Auto generated tray.io connector operation

module.exports = function(connector) { 

	//add an operation handler
	connector.on("<%= name %>", connector.hasRequiredParams([], function(data, done, err) {
		//step reply
		done({
			parameter: "value"
		});
	}));
};