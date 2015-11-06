
// Auto generated tray.io connector message

module.exports = function(connector) { 
	//add a health check method
	connector.on("<%= name %>", connector.hasRequiredParams([], function(data, done, err) {
		//step reply
		done({
			parameter: "value"
		});
	}));
};