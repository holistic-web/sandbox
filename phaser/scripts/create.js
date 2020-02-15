module.exports = () => {
		//Add background
		this.add.image(400, 300, 'sky');
		
		//Create static platforms group (non-moving)
		platforms = this.physics.add.staticGroup();
		
		//Double in size to create the floor
		platforms.create(400, 568, 'ground').setScale(2).refreshBody();
		
		//Creates the platforms in the sky
		platforms.create(600, 400, 'ground');
		platforms.create(50, 250, 'ground');
		platforms.create(750, 220, 'ground');

		//Create player(sprite) and add physics
		player = this.physics.add.sprite(100, 450, 'dude');

		//Set bounce after landing
		player.setBounce(0.2);
		//Player can't go beyond world bounds
		player.setCollideWorldBounds(true);
		//Create a collider between the player and the platforms to allow standing on them
		this.physics.add.collider(player, platforms);

		//Set left moving animation
		this.anims.create({
		    key: 'left',
		    frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
		    frameRate: 10,
		    repeat: -1
		});
		
		//Set turning animation
		this.anims.create({
		    key: 'turn',
		    frames: [ { key: 'dude', frame: 4 } ],
		    frameRate: 20
		});

		//Set right moving animation
		this.anims.create({
		    key: 'right',
		    frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
		    frameRate: 10,
		    repeat: -1
		});
};