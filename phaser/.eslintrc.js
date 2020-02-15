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
		// we can use new for magic effects (for "Phaser")
		'no-new': 0,

		// we don't need to reference 'this' in our class names
		'class-methods-use-this': 0,

		// allow use of "Phaser.Math.FloatBetween"
		'new-cap': 0
	}
};
