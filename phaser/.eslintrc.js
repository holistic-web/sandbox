module.exports = {
	env: {
		browser: true,
		es6: true,
	},
	extends: [
		'@holistic-web/eslint-config-toolbox',
	],
	globals: {
		Atomics: 'readonly',
		SharedArrayBuffer: 'readonly',
	},
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 2018,
		sourceType: 'module',
	},
	plugins: [
		'@typescript-eslint',
	],
	rules: {
		'no-new': 0
	}
};
