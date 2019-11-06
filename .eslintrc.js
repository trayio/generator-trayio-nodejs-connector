module.exports = {
	env: {
		node: true,
		es6: true,
	},
	globals: {
		_: true,
		when: true,
		mout: true,
		falafel: true,
	},
	plugins: [
		"jest"
	],
	extends: ['eslint:recommended', 'plugin:prettier/recommended', 'plugin:jest/recommended'],
	parserOptions: {
		ecmaVersion: 2018,
		sourceType: 'module',
	},
	rules: {
		'prettier/prettier': 'error',
		"no-console": 1,
		'no-unused-vars': ["error", { "args": "none" }],
		"prefer-template": 'error',
		"curly": 'error'
	}
}