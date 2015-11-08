var generators = require('yeoman-generator');

var MESSAGES_FOLDER = "messages";

module.exports = generators.Base.extend({
	constructor: function () {
		generators.Base.apply(this, arguments);
		this.option('name');
		this.option('help_link');
	},	
	installSDKDependency: function() {
	},
	promptMessageName: function() {
		if (!this.options.name) {
	 		var done = this.async();
			this.prompt({
				type    : 'input',
				name    : 'name',
				message : 'Connector name'
			}, function (answers) {
				this.log(answers.name);
				this.name = answers.name;			
				done();
			}.bind(this));
		} else {
			this.name = this.options.name;
		}	
	},	
	promptConnectorHelpLink: function() {
		if (!this.options.help_link) {
	 		var done = this.async();
			this.prompt({
				type    : 'input',
				name    : 'help_link',
				message : 'Connector help link'
			}, function (answers) {
				this.log(answers.help_link);
				this.help_link = answers.help_link;			
				done();
			}.bind(this));
		} else {
			this.help_link = this.options.help_link;
		}	
	},		
	updateConnectorsJSON: function() {
		var connectorsJSON = this.fs.readJSON(this.destinationPath("connectors.json"), []);
		connectorsJSON.push({
			name: this.name,
			version: "1.0",
			help_link: this.help_link,
			messages: []
		});
		this.conflicter.force = true;
		this.fs.writeJSON(this.destinationPath("connectors.json"), connectorsJSON, null, "\t");
	}
});