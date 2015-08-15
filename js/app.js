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

	this.jumpSpeed = 20;
	// initialize sonic as alive
	// this.alive === false;
};

/*
	Update sonic's sprite to give the appearance of movement
	Parameter - dt, the time delta between loops
*/
Sonic.prototype.update = function(dt) {
	// use sprites update method
	sonicSprite.update();
	// this.handleInput(key);
};

/*
	Draw the player character on the screen in canvas' context
*/
Sonic.prototype.render = function() {
	// use sprites render method
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
		*/
	if (key === "space" || key === "enter")
		sonicSprite.jump(key);
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

Sonic.prototype.jump = function() {
	
	/*
	var jumpImg = sonicSprite; //Resources.get("images/sonicstill.png");
	var pat = ctx.createPattern(jumpImg, "no-repeat");

	ctx.beginPath();
	ctx.strokeStyle = pat;
	ctx.moveTo(30, 250);
	ctx.lineTo(30, 75);
	ctx.stroke();
	*/
};

/*
	Zombie class creates the zombie/obstacle objects that sonic must
	avoid
	Parameters -
		x and y are initial zombie coordinates
		speed is how fast game is moving
*/
var Zombie = function() {
	// set zombie image/sprite
	this.sprite = "images/zombie.png";

	// set zombie initial location and speed
	this.setSpawnLocation(); // sets random x-coordinate off-screen
	this.y = 250; // constant
	this.setSpeed();

	// max number of zombies
	this.maxNumber = 5 + sonic.level;

	// set random values to help with random spawn times
	this.setRandom1();
	this.setRandom2();

	// this.count = 1;

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

	// if number of zombies is less than max number of zombies...
	if (zombies.length < this.maxNumber) {

		// and if two random numbers equal each other
		if (this.random1 == this.random2) {
			// spawn a new zombie
			zombies.push(new Zombie());

		// otherwise...
		} else {
			// change first random number
			this.setRandom1();
		}
	}
	
	// check if zombies are still in bounds
	this.boundsCheck();
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
	Reset zombie to random location once zombie moves out of bounds
*/
Zombie.prototype.boundsCheck = function() {
	
	if (this.x <= leftBound) {
		this.setSpawnLocation();
	}
};

/*
	Place zombie at random new x-coordinate
*/
Zombie.prototype.setSpawnLocation = function() {
	this.x = Math.floor(Math.random() * (1250 - 750 + 1)) + 750;
};

/*
	Set zombie speed
*/
Zombie.prototype.setSpeed = function() {
	// get a random number between 1 and 20
	var randomMult = Math.floor(Math.random() * (20 - 1 + 1)) + 1;

	// set random speed, with min being 41
	this.speed = - (30 + randomMult + (10 * sonic.level));
};

/*
	Set first random number - used for random spawn times
*/
Zombie.prototype.setRandom1 = function() {
	// set spawnTime between 10 and 10000
	this.random1 = Math.floor(Math.random() * (750 - 10 + 1)) + 10;
};

/*
	Set second random number - used for random spawn times
*/
Zombie.prototype.setRandom2 = function() {
	this.random2 = Math.floor(Math.random() * (750 - 10 + 1)) + 10;
};



/*
	NyanCat class creates the nyan cat objects that sonic collects
	to gain points
	Parameters - 
		x and y are initial coordinates of nyancats
		speed is how fast game is moving
*/
var NyanCat = function() {
	// set the nyancat image/sprite
	this.sprite = "images/nyancat.png";

	// set x and y coordinates
	this.setSpawnLocation();
	this.y = 75;

	// set cat speed
	this.setSpeed();

	console.log("im a cat");
};

/*
	Update nyancat location/position
	Parameters -
		dt, time delta between loops
		collisionCheck - function that returns true if sonic and zombie
		collide
*/
NyanCat.prototype.update = function(dt) {
	this.x = this.x + this.speed * dt;

	this.boundsCheck();
};

/*
	Draw NyanCat on the screen
*/
NyanCat.prototype.render = function() {
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/*
	Reset NyanCat if passes leftbounds
*/
NyanCat.prototype.boundsCheck = function() {
	if (this.x <= leftBound) {
		this.setSpawnLocation();
	}
};

/*
	Set random spawn location out of right bounds
*/
NyanCat.prototype.setSpawnLocation = function() {
	this.x = Math.floor(Math.random() * (1250 - 750 + 1)) + 750;
};

/*
	Set speed of cat based on sonic's level
*/
NyanCat.prototype.setSpeed = function() {
	this.speed = - (35 + (10 * sonic.level));
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

	this.setSpeed();
	this.speed = speed * this.speedMult;
};

/*
	Update position of background images to give the appearance
	of moving through the desert
	Parameter - dt, time delta between loops
*/
BkgdImages.prototype.update = function(dt) {
	this.x = this.x + this.speed * dt;

	this.boundsCheck();
};

/*
	Draw background images on the screen
*/
BkgdImages.prototype.render = function() {
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/*
	Set speed of background images so sonic appears to be moving
*/
BkgdImages.prototype.setSpeed = function() {
	this.speedMult = - (20 + (10 * sonic.level));
};

/*
	Reset bkgd images if they pass left bounds
*/
BkgdImages.prototype.boundsCheck = function() {
	if (this.x <= leftBound) {
		this.x = 760;
	}
};



// call gameBegin to prompt user to start game
// gameBegin();



// create new instance of sonic
var sonic = new Sonic();
console.log("sonic is instantiated");


// Place zombie objects in array called zombies
var zombies = [];
var zombie = new Zombie();
zombies.push(zombie);
console.log(zombies.length);
console.log(zombie.location);


// Place nyancat objects in array called nyancats
var nyancats = [];
var cat = new NyanCat();
nyancats.push(cat);


// Place background images in array called bkgdImgs
var bkgdImgs = [];
var cactusSprite = "images/cactus.png",
	rockSprite = "images/rocks.png",
	cloudSprite = "images/cloud.png",
	sunSprite = "images/sun1.png";
var sunImg = new BkgdImages(570, 10, sunSprite, 0);
bkgdImgs.push(sunImg);
var cloudImg = new BkgdImages(380, 50, cloudSprite, 0.5);
bkgdImgs.push(cloudImg);
var cactus = new BkgdImages(170, 175, cactusSprite, 1);
bkgdImgs.push(cactus);
var rock = new BkgdImages(515, 210, rockSprite, 1);
bkgdImgs.push(rock);



// Listen for key presses and send input to handleInput()
document.addEventListener("keydown", function(e) {
	var allowedKeys = {
		13: "enter",
		32: "space"
	};

	// sonicSprite.jump(allowedKeys[e.keyCode]);
	// gameBegin(allowedKeys[e.keyCode]);
	sonic.handleInput(allowedKeys[e.keyCode]);
});

