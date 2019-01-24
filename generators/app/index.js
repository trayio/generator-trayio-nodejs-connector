var generators = require('yeoman-generator');
var path = require('path');
var slugify = require('mout/string/slugify');

var OPERATION_FOLDER = "operations";

module.exports = generators.Base.extend({
	constructor: function() {
		generators.Base.apply(this, arguments);
		this.connectorName = process.cwd().split(path.sep).pop();
	},
	promptProjectTitle: function() {
		var done = this.async();
		this.prompt({
			type: 'input',
			name: 'title',
			message: 'Connector title (as it will appear in the tray UI)',
			default: this.appname // Default to current folder name
		}, function(answers) {
			this.log(answers.title);
			this.title = answers.title;
			done();
		}.bind(this));
	},
	promptProjectName: function() {
		var done = this.async();
		this.prompt({
			type: 'input',
			name: 'name',
			message: 'Connector name (how it will be referenced in workflows)',
			default: slugify(this.title) // Default to current folder name
		}, function(answers) {
			this.log(answers.name);
			this.name = answers.name;
			done();
		}.bind(this));
	},
	promptServiceName: function () {
		var done = this.async();
		this.prompt({
			type: 'input',
			name: 'service',
			message: 'Service name (the app the connector will be tied to)',
			default: this.name // Default to current folder name
		}, function(answers) {
			this.log(answers.service);
			this.service = answers.service;
			done();
		}.bind(this));
	},
	promptProjectDescription: function() {
		var done = this.async();
		this.prompt({
			type: 'input',
			name: 'description',
			message: 'Description'
		}, function(answers) {
			this.log(answers.description);
			this.description = answers.description;
			done();
		}.bind(this));
	},
	promptAuthor: function() {
		var done = this.async();
		this.prompt({
			type: 'input',
			name: 'author',
			message: 'Author'
		}, function(answers) {
			this.log(answers.author);
			this.author = answers.author;
			done();
		}.bind(this));
	},
	promptRepo: function() {
		var done = this.async();
		this.prompt({
			type: 'input',
			name: 'repository',
			message: 'Repository'
		}, function(answers) {
			this.log(answers.repository);
			this.repository = answers.repository;
			done();
		}.bind(this));
	},
	promptIncludeHttpTrigger: function() {
		var done = this.async();
		this.prompt({
			type: 'confirm',
			name: 'httpTrigger',
			message: 'Include an HTTP trigger?',
			default: true
		}, function(answers) {
			this.log(answers.httpTrigger);
			this.includeHttpTrigger = answers.httpTrigger;
			done();
		}.bind(this));
	},
	createPackage: function() {
		this.fs.copyTpl(
			this.templatePath("package.json"),
			this.destinationPath("package.json"), {
				name: this.connectorName,
				description: this.description,
				author: this.author,
				repository: this.repository
			}
		);
	},
	copyFiles: function() {

		//copy .files
		this.fs.copyTpl(this.templatePath(".editorconfig"), this.destinationPath(".editorconfig"), {});
		this.fs.copyTpl(this.templatePath(".eslintignore"), this.destinationPath(".eslintignore"), {});
		this.fs.copyTpl(this.templatePath(".eslintrc"), this.destinationPath(".eslintrc"), {});
		this.fs.copyTpl(this.templatePath("_gitignore"), this.destinationPath(".gitignore"), {}); // hack
		this.fs.copyTpl(this.templatePath(".jsinspectrc"), this.destinationPath(".jsinspectrc"), {});
		this.fs.copyTpl(this.templatePath(".travis.yml"), this.destinationPath(".travis.yml"), {});
		this.fs.copyTpl(this.templatePath("Gruntfile.js"), this.destinationPath("Gruntfile.js"), {});

		this.fs.copyTpl(this.templatePath("README.md"), this.destinationPath("README.md"), {
			name: this.name,
			description: this.description,
		});
		this.fs.copyTpl(this.templatePath("yart_run.sh"), this.destinationPath("yart_run.sh"), {});
		this.fs.copyTpl(this.templatePath("toss.json"), this.destinationPath("toss.json"), {
			service: this.service
		});

	},
	createConnectorJSON: function() {
		this.fs.write(this.destinationPath("connectors.json"), JSON.stringify([]));
	},
	installSDKDependency: function() {
		this.npmInstall(
			[
				'@trayio/falafel'
			],
			{
				'save': true
			}
		);
	},
	installGruntDependency: function() {
		this.npmInstall(
			[
				'grunt',
				'grunt-contrib-jshint',
				'grunt-contrib-watch',
				'generate-schema',
				'body-parser',
				'express'
			],
			{
				'saveDev': true
			}
		);
	},
	createMain: function() {
		this.fs.copyTpl(
			this.templatePath("main.js"),
			this.destinationPath("main.js"), {
				title: this.title
			}
		);
	},
	createConnectorsFolder: function() {
		this.fs.copyTpl(this.templatePath("connector/connector.js"), this.destinationPath('connectors/' + this.name + '/connector.js'), {
			title: this.title,
			description: this.description
		});

		this.fs.copyTpl(this.templatePath('connector/global_model.js'), this.destinationPath('connectors/' + this.name + '/global_model.js'), {});
		this.fs.copyTpl(this.templatePath('connector/global_schema.js'), this.destinationPath('connectors/' + this.name + '/global_schema.js'), {});

		if (this.includeHttpTrigger) {
			this.fs.copyTpl(this.templatePath('connector/trigger.js'), this.destinationPath('connectors/' + this.name + '/trigger.js'), {});
		}
	},
	createSampleMessage: function() {
		this.fs.copyTpl(
			this.templatePath('connector/sample_message/model.js'),
			this.destinationPath('connectors/' + this.name + '/sample_message/model.js'), {}
		);
		this.fs.copyTpl(
			this.templatePath('connector/sample_message/schema.js'),
			this.destinationPath('connectors/' + this.name + '/sample_message/schema.js'), {}
		);
		this.fs.copyTpl(
			this.templatePath('connector/sample_message/response.sample.json'),
			this.destinationPath('connectors/' + this.name + '/sample_message/response.sample.json'), {}
		);
	}
});
