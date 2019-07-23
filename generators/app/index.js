var generators = require('yeoman-generator');
var path = require('path');
var slugify = require('mout/string/slugify');
var sentenceCase = require('mout/string/sentenceCase');

var OPERATION_FOLDER = "operations";

module.exports = class extends generators {
	constructor(args, opts) {
		super(args, opts);
		this.connectorName = process.cwd().split(path.sep).pop();
	}
	async prompting() {
		const titleAnswer = await this.prompt({
			type: 'input',
			name: 'title',
			message: 'Connector title (as it will appear in the tray UI)',
			default: sentenceCase(this.appname) // Default to current folder name
		})
		const title = titleAnswer.title;
		const answers = await this.prompt([
			{
				type: 'input',
				name: 'name',
				message: 'Connector name (how it will be referenced in workflows)',
				default: slugify(title) // Default to current folder name
			},
			{
				type: 'input',
				name: 'service',
				message: 'Service name (the app the connector will be tied to)',
				default: title // Default to current folder name
			},
			{
				type: 'input',
				name: 'description',
				message: 'Description'
			},
			{
				type: 'input',
				name: 'author',
				message: 'Author',
				default: 'tray.io'
			},
			{
				type: 'input',
				name: 'repository',
				message: 'Repository'
			},
		])
		console.log(answers);
		this.title = title;
		this.name = answers.name;
		this.service = answers.service;
		this.description = answers.description;
		this.author = answers.author;
		this.repository = answers.repository;
	}
	createPackage() {
		console.log('packages');
		this.fs.copyTpl(
			this.templatePath("package.json"),
			this.destinationPath("package.json"), {
				name: this.connectorName,
				description: this.description,
				author: this.author,
				repository: this.repository
			}
		);
	}
	copyFiles() {
		console.log('copy');

		//copy .files
		this.fs.copyTpl(this.templatePath(".editorconfig"), this.destinationPath(".editorconfig"), {});
		this.fs.copyTpl(this.templatePath("_gitignore"), this.destinationPath(".gitignore"), {}); // hack
		this.fs.copyTpl(this.templatePath(".travis.yml"), this.destinationPath(".travis.yml"), {});
		this.fs.copyTpl(this.templatePath("README.md"), this.destinationPath("README.md"), {
			name: this.name,
			description: this.description,
		});
		this.fs.copyTpl(this.templatePath("toss.json"), this.destinationPath("toss.json"), {
			service: this.service
		});

	}
	createConnectorJSON() {
		this.fs.write(this.destinationPath("connectors.json"), JSON.stringify([]));
	}
	installSDKDependency() {
		this.npmInstall(
			[
				'@trayio/falafel'
			],
			{
				'save': true
			}
		);
	}
	installDevDependency() {
		this.npmInstall(
			[
				'prettier',
				'eslint',
				'eslint-config-prettier',
				'eslint-plugin-prettier',
				'generate-schema',
				'body-parser',
				'express'
			],
			{
				'saveDev': true
			}
		);
	}
	createMain() {
		this.fs.copyTpl(
			this.templatePath("main.js"),
			this.destinationPath("main.js"), {
				title: this.title
			}
		);
	}
	createConnectorsFolder() {
		this.fs.copyTpl(this.templatePath("connector/connector.js"), this.destinationPath('connectors/' + this.name + '/connector.js'), {
			title: this.title,
			name: this.name,
			description: this.description
		});

		this.fs.copyTpl(this.templatePath('connector/global_model.js'), this.destinationPath('connectors/' + this.name + '/global_model.js'), {});
		this.fs.copyTpl(this.templatePath('connector/global_schema.js'), this.destinationPath('connectors/' + this.name + '/global_schema.js'), {});
	}
	createSampleMessage() {
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
}
