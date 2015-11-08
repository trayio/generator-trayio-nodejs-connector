var bodyParser = require("body-parser");

//auto generated http trigger

module.exports = function(connector) {

	console.log("Creating http trigger");

	//listen for trigger http requests
	connector.trigger(function(request, response, metadata, requestMetadata, triggerWorkflow) {

		console.log("Incoming http trigger");

		var triggerData = {};

		//trigger the workflow
		triggerWorkflow(triggerData, function(responseData) {
			console.log("Got workflow response, sending back 200 OK");
			response.writeHead(200, {"Content-Type": "text/plain"});		
			response.end("Hello World");			
		});

	}, function() {
		//add any pre middleware to express
		//parse the url form encoded content
		connector.use(bodyParser.urlencoded({ extended: true }));	
	});

};