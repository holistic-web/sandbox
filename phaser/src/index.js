import Phaser from 'phaser';
import preload from './preload';
import create from './create';

const config = {
	type: Phaser.AUTO,
	width: 800,
	height: 600,
	scene: {
		preload,
		create
	}
};

new Phaser.Game(config);