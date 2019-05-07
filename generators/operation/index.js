var generators = require('yeoman-generator');
var _ = require('lodash');

var OPERATION_FOLDER = "operations";

module.exports = generators.Base.extend({
	constructor: function () {
		generators.Base.apply(this, arguments);
		this.option('connectorName');
		this.option('name');
		this.option('title');
		this.option('help_link');
	},
	installSDKDependency: function() {
	},
	promptConnector: function() {
		if (!this.options.connectorName) {
	 		var done = this.async();
	 		var connectorsJSON = this.fs.readJSON(this.destinationPath("connectors.json"), []);
	 		var choices = _.map(connectorsJSON, function(c) {
	 			return c.name;
	 		});
			this.prompt({
				type    : 'list',
				name    : 'name',
				message : 'Connector',
				choices : choices
			}, function (answers) {
				this.log(answers.name);
				this.connectorName = answers.name;
				done();
			}.bind(this));
		} else {
			this.connectorName = this.options.connectorName;
		}
	},
	promptOperationName: function() {
		if (!this.options.name) {
	 		var done = this.async();
			this.prompt({
				type    : 'input',
				name    : 'name',
				message : 'Operation name'
			}, function (answers) {
				this.log(answers.name);
				this.name = answers.name;
				done();
			}.bind(this));
		} else {
			this.name = this.options.name;
		}
	},
	promptOperationTitle: function() {
		if (!this.options.title) {
	 		var done = this.async();
			this.prompt({
				type    : 'input',
				name    : 'title',
				message : 'Operation title'
			}, function (answers) {
				this.log(answers.title);
				this.title = answers.title;
				done();
			}.bind(this));
		} else {
			this.title = this.options.title;
		}
	},
	promptOperationHelpLink: function() {
		if (!this.options.help_link) {
	 		var done = this.async();
			this.prompt({
				type    : 'input',
				name    : 'help_link',
				message : 'Operation help link'
			}, function (answers) {
				this.log(answers.help_link);
				this.help_link = answers.help_link;
				done();
			}.bind(this));
		} else {
			this.help_link = this.options.help_link;
		}
	},
	createHttp: function() {
	    this.fs.copyTpl(
			this.templatePath("operation.js"),
			this.destinationPath(OPERATION_FOLDER + "/" + this.name + ".js"),
			{
				name: this.name
			}
	    );
	},
	updateConnectorsJSON: function() {
		var connectorsJSON = this.fs.readJSON(this.destinationPath("connectors.json"), []);
		_.each(connectorsJSON, function(connector) {
			if (connector && this.connectorName === connector.name) {
				if (!connector.messages)
					connector.messages = [];
				connector.messages.push({
					name: this.name,
					title: this.title,
					help_link: this.help_link,
					input_schema: {
						"type": "object",
						"$schema": "http://json-schema.org/draft-04/schema",
						"id": "http://jsonschema.net",
						"additionalProperties": false,
						"properties": {
						}
					},
					output_schema: {
						"type": "object",
						"$schema": "http://json-schema.org/draft-04/schema",
						"id": "http://jsonschema.net",
						"additionalProperties": false,
						"properties": {
						}
					}
				});
			}
		}, this);
		this.conflicter.force = true;
		this.fs.writeJSON(this.destinationPath("connectors.json"), connectorsJSON, null, "\t");
	}
});
