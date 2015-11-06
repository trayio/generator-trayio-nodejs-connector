var generators = require('yeoman-generator');

var MESSAGES_FOLDER = "messages";

module.exports = generators.Base.extend({
	installSDKDependency: function() {
		this.npmInstall(['body-parser'], { 'save': true });		
	},
	createHttp: function() {
	    this.fs.copyTpl(
			this.templatePath("http.js"),
			this.destinationPath(MESSAGES_FOLDER + "/http.js"),
			{
				title: ""
			}
	    );		
	}
});