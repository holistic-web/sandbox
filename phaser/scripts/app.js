const phaser = require('phaser');
const preload = require('./preload');
const create = require('./create');

const config = {
	type: Phaser.AUTO,
	width: 800,
	height: 600,
	scene: {
		preload,
		create
	}
};

new phaser.Game(config);