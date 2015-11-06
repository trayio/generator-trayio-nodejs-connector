
// Auto generated tray.io connector health check

module.exports = function(connector) {
	//add a health check method
	connector.onHealthCheck(function(reply) {
		//reply healthy
		reply("healthy");
	});
};