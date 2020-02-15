const phaser = require('phaser');
const preload = require('./preload');
const create = require('./create');

const config = {
	type: Phaser.AUTO,
	width: 800,
	height: 600,
	physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
	scene: {
		preload,
		create
	}
};

new phaser.Game(config);