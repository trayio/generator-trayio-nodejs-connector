module.exports = {
	env: {
		node: true,
	},
	globals: {
		_: true,
		when: true,
		mout: true,
		falafel: true,
	},
	extends: [
		'eslint:recommended',
		'plugin:prettier/recommended',
		'plugin:jest/recommended',
	],
	parserOptions: {
		ecmaVersion: 2018,
		sourceType: 'module',
	},
	rules: {
		'prettier/prettier': 'error',
		'no-console': 1,
	},
};
