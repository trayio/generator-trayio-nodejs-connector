var generators = require('yeoman-generator');

var MESSAGES_FOLDER = "messages";

module.exports = generators.Base.extend({
	installSDKDependency: function() {
		this.npmInstall(['trayio-connector-sdk'], { 'save': true });		
	},
	promptProjectName: function() {
		var done = this.async();
		this.prompt({
			type    : 'input',
			name    : 'name',
			message : 'Your connector name',
			default : this.appname // Default to current folder name
		}, function (answers) {
			this.log(answers.name);
			this.name = name;			
			done();
		}.bind(this));		
	},
	promptIncludeHttpTrigger: function() {
		var done = this.async();
		this.prompt({
			type    : 'confirm',
			name    : 'httpTrigger',
			message : 'Include an HTTP trigger?',
			default : true
		}, function (answers) {
			this.log(answers.name);
			this.name = name;			
			done();
		}.bind(this));	
	},
	createMain: function() {
	    this.fs.copyTpl(
			this.templatePath("main.js"),
			this.destinationPath("main.js"),
			{
				title: this.name
			}
	    );		
	},
	createHealthz: function() {
	    this.fs.copyTpl(
			this.templatePath("healthz.js"),
			this.destinationPath(MESSAGES_FOLDER + "/healthz.js"),
			{
			}
	    );			
	}
});