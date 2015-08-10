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


/*
	Sonic class creates the player's character, Sonic the Hedgehog
	Parameters -
		x and y are the player's initial coordinates
		speed is the pace of the game based on level
*/
var Sonic = function(x, y, speed) {
	this.x = x;
	this.y = y;

	this.speed = speed;

	// set initial score to 0
	this.score = 0;

	// set initial life count to 3
	this.lives = 3;
};

/*
	Update sonic's sprite to give the appearance of movement
	Parameter - dt, the time delta between loops
*/
Sonic.prototype.update = function(dt) {
	// mulitply sprite change by dt to ensure that game runs
	// at the same speed on all computers
	this.sprite = this.sprite * dt; // not sure if correct
};

/*
	Draw the player character on the screen in canvas' context
*/
Sonic.prototype.render = function() {
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
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
	this.x = this.x + this.speed * dt;

	if (collisionCheck === true)
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

	this.sprite = this.img;

	this.speed = speed;
};


// Create new instance of sonic
var sonic = new Sonic();

// Place zombie objects in array called zombies
var zombies = [];
var zombie;

// Place nyancat objects in array called nyancats
var nyancats = [];
var cat;

// Place background images in array called bkgdImgs
var bkgdImgs = [];
var img;


// Listen for key presses and send input to handleInput()
document.addEventListener("keyup", function(e) {
	var allowedKeys = {
		13: "enter",
		32: "space"
	};

	sonic.handleInput(allowedKeys[e.keyCode]);
});