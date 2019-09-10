const generators = require('yeoman-generator');
const path = require('path');
const slugify = require('mout/string/slugify');
const filter = require('gulp-filter');
const removeComments = require('gulp-decomment');
const sentenceCase = require('mout/string/sentenceCase');

const jsFilter = filter('**/*.js', { restore: true });

module.exports = class extends generators {
	constructor(args, opts) {
		super(args, opts);
		this.connectorName = process
			.cwd()
			.split(path.sep)
			.pop();
	}
	async prompting() {
		const titleAnswer = await this.prompt({
			type: 'input',
			name: 'title',
			message: 'Connector title (as it will appear in the tray UI)',
			default: sentenceCase(this.appname), // Default to current folder name
		});
		const title = titleAnswer.title;

		const nameAnswer = await this.prompt({
			type: 'input',
			name: 'name',
			message: 'Connector name (how it will be referenced in workflows)',
			default: slugify(title), // Default to connector title
		});
		const name = nameAnswer.name;

		const answers = await this.prompt([
			{
				type: 'input',
				name: 'service',
				message: 'Service name (the app the connector will be tied to)',
				default: name, // Default to current connector name
			},
			{
				type: 'input',
				name: 'description',
				message: 'Description',
			},
			{
				type: 'input',
				name: 'author',
				message: 'Author',
				default: 'tray.io',
			},
			{
				type: 'input',
				name: 'repository',
				message: 'Repository',
			},
			{
				type: 'confirm',
				name: 'httpTrigger',
				message: 'Is trigger connector?',
				default: false,
			},
			{
				type: 'confirm',
				name: 'removeComments',
				message: 'Remove comments from generated files?',
				default: false,
			},
			{
				type: 'confirm',
				name: 'addUnitTesting',
				message: 'Add unit testing?',
				default: true,
			},
			{
				type: 'confirm',
				name: 'addIntegrationTesting',
				message: 'Add integration testing?',
				default: false,
			},
		]);
		this.title = title;
		this.name = name;
		this.service = answers.service;
		this.description = answers.description;
		this.author = answers.author;
		this.repository = answers.repository;
		this.httpTrigger = answers.httpTrigger;
		this.removeComments = answers.removeComments;
		this.addUnitTesting = answers.addUnitTesting;
		this.addIntegrationTesting = answers.addIntegrationTesting;
	}

	addUnitTesting() {
		if (this.addUnitTesting) {
			this.npmInstall(
				[
					'jest',
					'jest-json-schema',
					'jest-json-schema-extended',
					'@trayio/connector-test-runner',
					'nock',
					'dotenv',
				],
				{
					saveDev: true,
				},
			);
			this.fs.copyTpl(
				this.templatePath('jest.config.js'),
				this.destinationPath('jest.config.js'),
				{},
			);
			this.fs.copyTpl(
				this.templatePath(`tests/jestSetup.js`),
				this.destinationPath('tests/jestSetup.js'),
				{},
			);
			this.fs.copyTpl(
				this.templatePath(`tests/unit/operations/config.js`),
				this.destinationPath(`tests/unit/operations/config.js`),
				{},
			);
			this.fs.copyTpl(
				this.templatePath(`tests/unit/operations/operations.test.js`),
				this.destinationPath(
					`tests/unit/operations/operations.test.js`,
				),
				{},
			);
		}
	}

	addIntegrationTesting() {
		if (this.addIntegrationTesting) {
			this.fs.copyTpl(
				this.templatePath('.env'),
				this.destinationPath('.env'),
				{},
			);
			this.fs.copyTpl(
				this.templatePath('tests/integration/sample_message.test.js'),
				this.destinationPath(
					'tests/integration/sample_message.test.js',
				),
				{},
			);
		}
	}

	removeComments() {
		if (this.removeComments) {
			// Automatically remove all comments in javascript files using gulp
			this.registerTransformStream([
				jsFilter,
				removeComments(),
				jsFilter.restore,
			]);
		}
	}

	createPackage() {
		this.fs.copyTpl(
			this.templatePath('package.json'),
			this.destinationPath('package.json'),
			{
				name: this.connectorName,
				description: this.description,
				author: this.author,
				repository: this.repository,
			},
		);
	}
	copyFiles() {
		this.fs.copyTpl(
			this.templatePath('.editorconfig'),
			this.destinationPath('.editorconfig'),
			{},
		);
		this.fs.copyTpl(
			this.templatePath('README.md'),
			this.destinationPath('README.md'),
			{
				name: this.name,
				description: this.description,
			},
		);
	}
	createConnectorJSON() {
		this.fs.write(
			this.destinationPath('connectors.json'),
			JSON.stringify([]),
		);
	}
	installSDKDependency() {
		this.npmInstall(['@trayio/falafel'], {
			save: true,
		});
	}
	installDevDependency() {
		this.npmInstall(
			[
				'prettier',
				'eslint',
				'eslint-config-prettier',
				'eslint-plugin-prettier',
				'eslint-plugin-jest',
				'express',
				'node-dev',
			],
			{
				saveDev: true,
			},
		);
	}
	createMain() {
		this.fs.copyTpl(
			this.templatePath('main.js'),
			this.destinationPath('main.js'),
			{
				title: this.title,
			},
		);
	}
	createConnector() {
		const templateFolder = this.httpTrigger ? 'trigger' : 'connector';
		const operationFolder = this.httpTrigger ? 'webhook' : 'sample_message';

		this.fs.copyTpl(
			this.templatePath(`${templateFolder}/connector.js`),
			this.destinationPath('connectors/' + this.name + '/connector.js'),
			{
				title: this.title,
				name: this.name,
				description: this.description,
			},
		);

		this.fs.copyTpl(
			this.templatePath(`${templateFolder}/global_model.js`),
			this.destinationPath(`connectors/${this.name}/global_model.js`),
			{},
		);

		this.fs.copyTpl(
			this.templatePath(`${templateFolder}/global_schema.js`),
			this.destinationPath(`connectors/${this.name}/global_schema.js`),
			{},
		);

		this.fs.copyTpl(
			this.templatePath(`${templateFolder}/${operationFolder}/model.js`),
			this.destinationPath(
				`connectors/${this.name}/${operationFolder}/model.js`,
			),
			{},
		);

		this.fs.copyTpl(
			this.templatePath(`${templateFolder}/${operationFolder}/schema.js`),
			this.destinationPath(
				`connectors/${this.name}/${operationFolder}/schema.js`,
			),
			{},
		);

		this.fs.copyTpl(
			this.templatePath(
				`${templateFolder}/${operationFolder}/response.sample.json`,
			),
			this.destinationPath(
				`connectors/${this.name}/${operationFolder}/response.sample.json`,
			),
			{},
		);

		if (this.httpTrigger) {
			// Copy over the request and destroy.js if it's a trigger connector.
			this.fs.copyTpl(
				this.templatePath(
					`${templateFolder}/${operationFolder}/request.js`,
				),
				this.destinationPath(
					`connectors/${this.name}/${operationFolder}/request.js`,
				),
				{},
			);
			this.fs.copyTpl(
				this.templatePath(
					`${templateFolder}/${operationFolder}/destroy.js`,
				),
				this.destinationPath(
					`connectors/${this.name}/${operationFolder}/destroy.js`,
				),
				{},
			);
		}
	}
};
