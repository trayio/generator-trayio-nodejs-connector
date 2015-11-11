var generators = require('yeoman-generator');
var path = require('path');

var OPERATION_FOLDER = "operations";

module.exports = generators.Base.extend({
	constructor: function () {
		generators.Base.apply(this, arguments);		
		this.connectorName = process.cwd().split(path.sep).pop();
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
			this.name = answers.name;			
			done();
		}.bind(this));		
	},
	promptProjectDescription: function() {
		var done = this.async();
		this.prompt({
			type    : 'input',
			name    : 'description',
			message : 'Description'
		}, function (answers) {
			this.log(answers.description);
			this.description = answers.description;			
			done();
		}.bind(this));		
	},
	promptAuthor: function() {
		var done = this.async();
		this.prompt({
			type    : 'input',
			name    : 'author',
			message : 'Author'
		}, function (answers) {
			this.log(answers.author);
			this.author = answers.author;			
			done();
		}.bind(this));		
	},
	promptRepo: function() {
		var done = this.async();
		this.prompt({
			type    : 'input',
			name    : 'repository',
			message : 'Repository'
		}, function (answers) {
			this.log(answers.repository);
			this.repository = answers.repository;			
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
			this.log(answers.httpTrigger);
			this.includeHttpTrigger = answers.httpTrigger;			
			done();
		}.bind(this));	
	},	
	createPackage: function() {
	    this.fs.copyTpl(
			this.templatePath("package.json"),
			this.destinationPath("package.json"),
			{
				name: this.connectorName,
				description: this.description,
				author: this.author,
				repository: this.repository
			}
	    );		
	},
	copyFiles: function() {

		//copy .files
		this.fs.copyTpl(this.templatePath(".editorconfig"),this.destinationPath(".editorconfig"),{});	
		this.fs.copyTpl(this.templatePath(".eslintignore"),this.destinationPath(".eslintignore"),{});	
		this.fs.copyTpl(this.templatePath(".eslintrc"),this.destinationPath(".eslintrc"),{});	
		this.fs.copyTpl(this.templatePath(".gitignore"),this.destinationPath(".gitignore"),{});	
		this.fs.copyTpl(this.templatePath(".jsinspectrc"),this.destinationPath(".jsinspectrc"),{});	
		this.fs.copyTpl(this.templatePath(".travis.yml"),this.destinationPath(".travis.yml"),{});	

	    this.fs.copyTpl(this.templatePath("README.md"),this.destinationPath("README.md"),
	    {
	    	name: this.name,
	    	description: this.description,
	    });	
	    this.fs.copyTpl(this.templatePath("yart_run.sh"),this.destinationPath("yart_run.sh"),{});	

	},	
	createConnectorJSON: function() {
		this.fs.write(this.destinationPath("connectors.json"), JSON.stringify([]));
	},
	installSDKDependency: function() {
		this.npmInstall(['trayio-connector-sdk'], { 'save': true });		
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
			this.destinationPath(OPERATION_FOLDER + "/healthz.js"),
			{
			}
	    );			
	},
	createHttp: function() {
		if (this.includeHttpTrigger) {		  
			this.composeWith("trayio-nodejs-connector:trigger", { options: {				
			}});		  
		}
	}
});