/*
	app.js
	---------
	Sonic vs. Zombies
	-----------------
	Alexxis Johnson - Aug. 9th, 2015
	--------------------------------
	App file adds functionality to the game and handles user input. It
	defines and creates the player character (sonic), the obstacles
	(zombies), the tokens (nyan cats), and the background images (cactus,
	clouds, rocks, and sun) that create a "moving" background. It also
	defines the keys that the user uses to play the game and updates the
	score.
*/


"use strict";

/*
	gameBegin function starts the game
	Parameter - key, user's keyboard input

function gameBegin(key) {
	ctx.strokeText("Press enter to begin", 0, ctx.height/2);

	if (key === "enter")
		return true;
	else
		return false;
}
*/

// canvas bounds
var rightBound = 760,
	leftBound = 0;

/*
	Sonic class creates the player's character, Sonic the Hedgehog
*/
var Sonic = function() {
	console.log("sonic is loaded");

	// set initial score to 0
	this.score = 0;

	// set initial life count to 3
	this.lives = 3;

	// set initial level to 1
	this.level = 1;

	// initialize sonic as alive
	// this.alive === false;


};

/*
	Update sonic's sprite to give the appearance of movement
	Parameter - dt, the time delta between loops
*/
Sonic.prototype.update = function(dt) {
	sonicSprite.update();
};

/*
	Draw the player character on the screen in canvas' context
*/
Sonic.prototype.render = function() {
	sonicSprite.render();
};

/*
	Respond to user input via keyboard
	Parameter - key, the key pressed by the player
*/
Sonic.prototype.handleInput = function(key) {
	/*
	if (key === "enter")
		if (this.newGame)
			this
	if (key === "space")
		// jump
	*/
};

Sonic.prototype.loseLife = function() {
	// reset score
	this.score = 0;

	this.x = 0;
	this.y = 50;

	// decrease life count
	this.lives--;

	// game over when no more lives
	if (this.lives === 0)
		reset();
};


/*
	Zombie class creates the zombie/obstacle objects that sonic must
	avoid
	Parameters -
		x and y are initial zombie coordinates
		speed is how fast game is moving
*/
var Zombie = function(x, y, speed) {
	// set zombie image/sprite
	this.sprite = "images/zombie.png";

	this.x = x;
	this.y = y;

	this.speed = speed;

	this.maxNumber = 6;

	this.setSpawnPoint();

	this.setSpawnTime();

	this.count = 1;

	// this.count = this.setNewCount();

	console.log("zombie loaded");
};

/*
	Draw the zombie/obstacle on the screen using the canvas' context
*/
Zombie.prototype.render = function() {
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/*
	Update zombie location/position
	Parameters -
		dt, time delta between loops
		collisionCheck - function that returns true if sonic and zombie
		collide
*/
Zombie.prototype.update = function(dt) {
	// multiply movement by dt to ensure game runs at same speed across
	// different browsers
	this.x = this.x + this.speed * dt;


	// time is between 10 and 19
	var time = dt * 1000.0;

	this.timeMult * time;

	if (zombies.length < this.maxNumber) {
		if (this.spawnPoint == this.spawnTime) {
			zombies.push(new Zombie(760, 250, -40 * sonic.level));
			this.setSpawnTime();
			this.setSpawnPoint();
			this.count++;
		} else {
			this.setSpawnTime();
		}
	} else {
		this.setSpawnTime();
		this.setSpawnPoint();
	}
	// console.log(time);
	
	this.boundsCheck();

	// this.checkSpawnPoint();
	/*
	if (time == this.spawnTime) {
		zombies.push(new Zombie(760, 250, -40 * sonic.level));
		this.setSpawnTime();
	}
	*/
	/*
	if (this.collisionCheck() === true)
		sonic.loseLife();
	*/

	// console.log("zombie updated");
};

/*
Zombie.prototype.checkSpawnPoint = function() {
	if (this.spawnPoint.valueOf() === this.x.valueOf) {
		zombies.push(new Zombie(760, 250, -40 * sonic.level));
	}
};
*/
/*
	Check for collisions between zombie and sonic
	Return true if collide; false if have not collided
*/
Zombie.prototype.collisionCheck = function() {
	if (this.x === sonic.x && this.y === sonic.y)
		return true;
	else
		return false;
};

Zombie.prototype.boundsCheck = function() {
	
	if (this.x <= leftBound) {
		this.x = 760;
		this.setSpawnPoint();
	}

	/*
	if (this.count <= 1) {
		this.setNewCount();
		this.x = 760;
		this.y = 250;
		this.speed = (-40 * sonic.level);
		console.log("count thing");
	}
	*/
};

Zombie.prototype.setSpawnTime = function(dt) {

	// multiply time by random number
	this.timeMult =  Math.floor(Math.random() * (1000 - 1 + 1)) + 1;

	// set spawnTime between 10 and 10000
	this.spawnTime = Math.floor(Math.random() * (750 - 10 + 1)) + 10;
	// return this.count;
};

Zombie.prototype.setSpawnPoint = function() {
	this.spawnPoint = Math.floor(Math.random() * (750 - 10 + 1)) + 10;
};

/*
	NyanCat class creates the nyan cat objects that sonic collects
	to gain points
	Parameters - 
		x and y are initial coordinates of nyancats
		speed is how fast game is moving
*/
var NyanCat = function(x, y, speed) {
	// set the nyancat image/sprite
	this.sprite = "images/nyancat.png";

	this.x = x;
	this.y = y;

	this.speed = speed;
};


/*
	BkgdImages class creates the background images that create
	the illusion of movement through the desert.
	Parameters - 
		x and y are initial coordinates of image
		img is the specific background image
		speed is how fast game is moving
*/
var BkgdImages = function(x, y, img, speed) {
	this.x = x;
	this.y = y;

	this.sprite = img;

	this.speed = speed;
};

/*
	Update position of background images to give the appearance
	of moving through the desert
	Parameter - dt, time delta between loops
*/
BkgdImages.prototype.update = function(dt) {
	this.x = this.x + this.speed * dt;
};

/*
	Draw background images on the screen
*/
BkgdImages.prototype.render = function() {
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


// call gameBegin to prompt user to start game
// gameBegin();

// Place background images in array called bkgdImgs
var bkgdImgs = [];
var cactusSprite = "images/cactus.png",
	rockSprite = "images/rocks.png",
	cloudSprite = "images/cloud.png",
	sunSprite = "images/sun1.png";
var sunImg = new BkgdImages(20, 10, sunSprite, 0);
bkgdImgs.push(sunImg);
var cloudImg = new BkgdImages(380, 50, cloudSprite, 0);
bkgdImgs.push(cloudImg);
var cactus = new BkgdImages(170, 175, cactusSprite, 0);
bkgdImgs.push(cactus);
var rock = new BkgdImages(515, 210, rockSprite, 0);
bkgdImgs.push(rock);

// create new instance of sonic
var sonic = new Sonic();
console.log("sonic is instantiated");

// Place zombie objects in array called zombies
var zombies = [];
// var zombie;

var zombie = new Zombie(760, 250, -40 * sonic.level);
zombies.push(zombie);
console.log(zombie.spawnPoint);
console.log(zombie.spawnTime);
console.log(zombies.length);

/*
if (zombies.length < zombies.maxNumber) {
	if (zombie.spawnPoint == zombie.spawnTime) {
		zombies.push(new Zombie(760, 250, -40 * sonic.level));
		zombie.setSpawnTime();
		zombie.setSpawnPoint
	} else {
		zombie.setSpawnTime();
	}
}
*/
// Place nyancat objects in array called nyancats
var nyancats = [];
var cat;

// Listen for key presses and send input to handleInput()
document.addEventListener("keyup", function(e) {
	var allowedKeys = {
		13: "enter",
		32: "space"
	};

	// gameBegin(allowedKeys[e.keyCode]);
	sonic.handleInput(allowedKeys[e.keyCode]);
});