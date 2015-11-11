var TrayConnector = require("trayio-connector-sdk");
var path = require("path");
var fs = require("fs");

console.info("Starting <%= title %> connector");

//Create a new tray connector instance
var connector = new TrayConnector({});

//Load any message handlers from the operations folder
var normalizedPath = path.join(__dirname, "operations");
fs.readdirSync(normalizedPath).forEach(function(file) {
	console.info("Adding connector message handler " + file);
  	require("./operations/" + file)(connector);
});

//Load any trigger handlers
var triggersNormalizedPath = path.join(__dirname, "triggers");
fs.readdirSync(triggersNormalizedPath).forEach(function(file) {
	console.info("Adding trigger handler " + file);
  	require("./triggers/" + file)(connector);
});

