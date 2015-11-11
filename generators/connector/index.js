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
	promptType: function() {
		if (!this.options.connectorType) {
	 		var done = this.async();
			this.prompt({
				type    : 'list',
				name    : 'type',
				message : 'Type',
				choices : ['trigger', 'logic', 'service', 'output']
			}, function (answers) {
				this.log(answers.type);
				this.connectorType = answers.type;			
				done();
			}.bind(this));
		} else {
			this.connectorType = this.options.connectorType;
		}	
	},	
	promptMessageTitle: function() {
		if (!this.options.title) {
	 		var done = this.async();
			this.prompt({
				type    : 'input',
				name    : 'title',
				message : 'Connector title'
			}, function (answers) {
				this.log(answers.title);
				this.connectorTitle = answers.title;			
				done();
			}.bind(this));
		} else {
			this.connectorTitle = this.options.title;
		}	
	},	
	promptMessageDescription: function() {
		if (!this.options.description) {
	 		var done = this.async();
			this.prompt({
				type    : 'input',
				name    : 'description',
				message : 'Connector description'
			}, function (answers) {
				this.log(answers.description);
				this.connectorDescription = answers.description;			
				done();
			}.bind(this));
		} else {
			this.connectorDescription = this.options.description;
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
			title: this.connectorTitle,
			description: this.connectorDescription,
			version: "1.0",
			help_link: this.help_link,
			tags: [this.connectorType],
			icon: {
				type: "streamline",
				value: "hierarchy-1"
			},
			messages: []
		});
		this.conflicter.force = true;
		this.fs.writeJSON(this.destinationPath("connectors.json"), connectorsJSON, null, "\t");
	}
});