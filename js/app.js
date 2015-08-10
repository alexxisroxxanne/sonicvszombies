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

/*
	Sonic class creates the player's character, Sonic the Hedgehog
	Parameters -
		x and y are the player's initial coordinates
		sprites passes in a sprite object to add animation
		speed is the pace of the game based on level
*/
var Sonic = function(x, y, sprites) {
	// set initial sprite/image
	this.sprite = sprites;

	this.x = x;
	this.y = y;

	// this.speed = speed;

	// set initial score to 0
	this.score = 0;

	// set initial life count to 3
	this.lives = 3;

	// initialize sonic as alive
	this.alive === false;
};

/*
	Update sonic's sprite to give the appearance of movement
	Parameter - dt, the time delta between loops
*/
Sonic.prototype.update = function(dt) {
	// mulitply sprite change by dt to ensure that game runs
	// at the same speed on all computers
	// this.sprite = this.sprite * dt; // not sure if correct

	var sonicSprite = new Image();
	sonicSprite.src = "images/sonicsprites.png";

	var spriteObj = sonic.sprites({
		context: ctx,
		width: 102.2,
		height: 117,
		image: sonicSprite
	});

};

/*
	Draw the player character on the screen in canvas' context
*/
Sonic.prototype.render = function() {
	ctx.drawImage(Resources.get(this.sprite), 0, 117, 102.2, 117, 30, 250, 102.2, 117);
};

Sonic.prototype.sprites = function(options) {
	var that = {};

	that.context = options.context;
	that.width = options.width;
	that.height = options.height;
	that.image = options.image;

	return that;
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
	this.score = 0;
	this.x = 0;
	this.y = 50;
	this.lives--;

	if (this.lives = 0)
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
Zombie.prototype.update = function(dt, collisionCheck) {
	// multiply movement by dt to ensure game runs at same speed across
	// different browsers
	this.x = this.x - this.speed * dt;

	if (this.collisionCheck() === true)
		sonic.loseLife();
};

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


// Create new instance of sonic
var sonicSprite = new Sprite("images/sonicsprites.png", [0, 120], [105, 120], 2,
				[0, 1, 2, 3], "horizontal", false);

var sonics = [];
var sonic = new Sonic(30, 250, sonicSprite);
sonics.push(sonic);

// Place zombie objects in array called zombies
var zombies = [];
var zombie = new Zombie(775, 250, 20);

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