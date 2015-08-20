/**
 * app.js
 * ---------
 * Sonic vs. Zombies
 * -----------------
 * Alexxis Johnson - Aug. 19th, 2015
 * --------------------------------
 * App file adds functionality to the game and handles user input. It
 * defines and creates the player character (sonic), the obstacles
 * (zombies), the tokens (nyan cats), and the background images (cactus,
 * clouds, rocks, and sun) that create a "moving" background. It also
 * defines the keys that the user uses to play the game and updates the
 * score.
 */


'use strict';


// canvas bounds constants
const rightBound = 760;
const leftBound = 0;

// first level set to 1
let level = 1;


// TODO: create super and subclasses for code reuse

/**
 * Sonic class creates the player's character, Sonic the Hedgehog
 */
var Sonic = function() {
	// set coordinates = to sprite coordinates
	this.x = sonicSprite.x;
	this.y = sonicSprite.y;

	// set initial score to 0
	this.score = 0;

	// set initial life count to 3
	this.lives = 3;
};

/**
 * Update sonic's sprite to give the appearance of movement, using
 * sprite's update method
 * Parameter - dt, the time delta between loops
 */
Sonic.prototype.update = function(dt) {
	sonicSprite.update();
};

/**
 * Draw the player character on the screen in canvas' context
 * using sprite's render method
 */
Sonic.prototype.render = function() {
	sonicSprite.render();
};

/**
 * handleInput responds to key presses to make sonic jump while playing
 * Parameter - key, the key pressed by the player
 */
Sonic.prototype.handleInput = function(key) {
	// use sonicSprite jump method due to sprite sheet change during jump
	if (key === 'space' || key === 'enter')
		sonicSprite.jump(key);
	this.ready = true;
};

/**
 * Increase score by 10 points, and increase level by 1 if score
 * is a multiple of 100; increase life count by 1 if level goes up
 */
Sonic.prototype.increaseScore = function() {
	this.score += 10;

	// scoreDiv is for increasing level
	var scoreDiv = this.score % 100;

	if (this.score > 0 && scoreDiv === 0) {
		level++;
		if (this.lives < 3)
			this.lives++;
	}
};

/**
 * Reset score and decrease lives if lost a life;
 * Handle entity movement if game is over
 */
Sonic.prototype.loseLife = function() {
	// reset score to nearest multiple of 100 below score
	var scoreDiv = this.score % 100;
	if (this.score >= 100) {
		this.score = this.score - scoreDiv;
	} else
		this.score = 0;

	// decrease life count
	this.lives--;

	// move entities off screen and stop movement if game is over
	if (this.lives === 0) {
		zombies.forEach(function(zombie) {
			zombie.setSpawnLocation();
			zombie.speed = 0;
		});
		nyancats.forEach(function(cat) {
			cat.setSpawnLocation();
			cat.speed = 0;
		});
		bkgdImgs.forEach(function(img) {
			img.speed = 0;
		});
	}
};

/**
 * Reset life count when user presses up key after game ends
 * Param - key, the key the user presses
 */
Sonic.prototype.restartGame = function(key) {
	if (key === 'up' && this.lives <= 0) {
		this.lives = 3;
	}
};



/**
 * NyanCat class creates the nyan cat objects that sonic collects
 * to gain points
 */
var NyanCat = function() {
	// set the nyancat image/sprite
	this.sprite = 'images/nyancat.png';

	// set x and y coordinates
	this.setSpawnLocation();
	this.y = 250;

	// set cat speed
	this.setSpeed();

	// set maximum number of cats allowed per level
	this.maxNumber = 1 + level;

};

/**
 * Update nyancat location/position
 * Parameter - dt, time delta between loops
 */
NyanCat.prototype.update = function(dt) {
	// move cat, using dt to render at same speed across browsers
	this.x = this.x + this.speed * dt;

	// if number of cats is less than max number of cats...
	if (nyancats.length < this.maxNumber) {

		// and if two random numbers equal each other
		if (this.random1 === this.random2) {

			// spawn a new cat
			nyancats.push(new NyanCat());

		// otherwise...
		} else {

			// change first random number
			this.setRandom1();
		}
	}

	// call checking methods
	this.boundsCheck();
	this.collisionCheck();
	this.checkLevelUp(level);
	
};

/**
 * Draw NyanCat on the screen
 */
NyanCat.prototype.render = function() {
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/**
 * Reset NyanCat if passes leftbounds
 */
NyanCat.prototype.boundsCheck = function() {
	if (this.x <= leftBound) {
		this.setSpawnLocation();
	}
};

/**
 * Increase points if sonic and cat collide
 */
NyanCat.prototype.collisionCheck = function() {
	// find x and y coordinate differences between sprites
	var yDiffCat = this.y - sonicSprite.y;
	var xDiffCat = this.x - sonic.x;

	// if y coordinates are within pixel range
	if (yDiffCat > -15 && yDiffCat < 15) {
		// and if x coordinates are within pixel range
		if (xDiffCat > -30 && xDiffCat < 30) {
			// increase score and reset cat offscreen
			sonic.increaseScore();
			this.setSpawnLocation();
		}
	}
};

/**
 * Set random spawn location out of right bounds
 */
NyanCat.prototype.setSpawnLocation = function() {
	this.x = Math.floor(Math.random() * (1250 - 750 + 1)) + 750;
};

/**
 * Set speed of cat based on sonic's level
 */
NyanCat.prototype.setSpeed = function() {
	this.speed = - (130 + (10 * level));
};

/**
 * Set first random number - used for random spawn times
 */
NyanCat.prototype.setRandom1 = function() {
	this.random1 = Math.floor(Math.random() * (750 - 10 + 1)) + 10;
};

/**
 * Set second random number - used for random spawn times
 */
NyanCat.prototype.setRandom2 = function() {
	this.random2 = Math.floor(Math.random() * (750 - 10 + 1)) + 10;
};

/**
 * Reset cat off screen
 */
NyanCat.prototype.levelReset = function() {
	this.setSpawnLocation();
	this.setSpeed();
};

/**
 * Pause movement of nyancats if user presses p,
 * or restart movement if user presses up arrow
 * Param - key, the key the user presses
 */
NyanCat.prototype.pauseMotion = function(key) {
	// p for pause, up for restart
	if (key === 'p')
		this.speed = 0;
	else if (key === 'up' && this.speed === 0)
		this.setSpeed();
};

/**
 * Check if player has leveled up
 */
NyanCat.prototype.checkLevelUp = function(level) {
	this.maxNumber = level + 1;
};



/**
 * Zombie class creates the zombie/obstacle objects that sonic must
 * avoid
 */
var Zombie = function() {
	// set zombie image/sprite
	this.sprite = 'images/zombie.png';

	// set zombie initial location and speed
	this.setSpawnLocation();
	this.y = 250;
	this.setSpeed();

	// max number of zombies
	this.maxNumber = 2 + level;

	// set random values to create random spawn times
	this.setRandom1();
	this.setRandom2();

};

/**
 * Update zombie location/position
 * Parameter - dt, time delta between loops
 */
Zombie.prototype.update = function(dt) {
	// multiply movement by dt to run game at same speed across browsers
	this.x = this.x + this.speed * dt;

	// if # of zombies < max # of zombies (and game isn't paused)
	if (zombies.length < this.maxNumber && this.speed !== 0) {

			// and if two random numbers equal each other
			if (this.random1 === this.random2) {

				// spawn a new zombie
				zombies.push(new Zombie());

			// otherwise...
			} else {
				// change first random number
				this.setRandom1();
			}
	}
	
	// call checking methods
	this.boundsCheck();
	this.collisionCheck();
	this.checkLevelUp(level);
};

/**
 * Draw the zombie/obstacle on the screen using the canvas' context
 */
Zombie.prototype.render = function() {
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/**
 * Reset zombie to random location once zombie moves out of bounds
 */
Zombie.prototype.boundsCheck = function() {
	if (this.x <= leftBound) {
		this.setSpawnLocation();
	}
};

/**
 * Check for collisions between zombie and sonic
 * Handle reseting level if zombie and sonic collide
 */
Zombie.prototype.collisionCheck = function() {
	// find coordinate diff b/t sprites; use sonicSprite for jumps
	var yDiffZom = this.y - sonicSprite.y;
	var xDiffZom = this.x - sonic.x;

	// if y coordinates are within pixel range
	if (yDiffZom > -15 && yDiffZom < 15) {

		// and if x coordinates are within pixel range
		if (xDiffZom > -20 && xDiffZom < 20) {

			sonic.loseLife();
			
			zombies.forEach(function(zombie) {
				zombie.levelReset();
			});

			nyancats.forEach(function(cat) {
				cat.levelReset();
			});

		}
	}
};

/**
 * Place zombie at random new x-coordinate
 */
Zombie.prototype.setSpawnLocation = function() {
	this.x = Math.floor(Math.random() * (1250 - 750 + 1)) + 750;
};

/**
 * Set zombie speed
 */
Zombie.prototype.setSpeed = function() {
	// get a random number between 1 and 20
	var randomMult = Math.floor(Math.random() * (20 - 1 + 1)) + 1;

	// set random speed, with min being 41
	this.speed = - (150 + randomMult + (10 * level));
	return this.speed;
};

/**
 * Set first random number - used for random spawn times
 */
Zombie.prototype.setRandom1 = function() {
	this.random1 = Math.floor(Math.random() * (750 - 10 + 1)) + 10;
};

/**
 * Set second random number - used for random spawn times
 */
Zombie.prototype.setRandom2 = function() {
	this.random2 = Math.floor(Math.random() * (750 - 10 + 1)) + 10;
};

/**
 * Reset zombie off screen and reset speed
 */
Zombie.prototype.levelReset = function() {
	this.setSpawnLocation();
	this.setSpeed();
};

/**
 * Pause movement of zombies if user presses p,
 * or restart movement if user presses up arrow
 * Param - key, the key the user presses
 */
Zombie.prototype.pauseMotion = function(key) {
	if (key === 'p' || sonic.lives <= 0)
		this.speed = 0;
	else if (key === 'up' && this.speed === 0)
		this.setSpeed();
};

/**
 * Update max number of zombies based on player level
 */
Zombie.prototype.checkLevelUp = function(level) {
	this.maxNumber = level + 1;
};



/**
 * BkgdImages class creates the background images that create
 * the illusion of movement through the desert.
 * Parameters - 
 *   x and y are initial coordinates of image
 *   img is the specific background image
 *   speed is how fast image is moving
 */
var BkgdImages = function(x, y, img, speed) {
	this.x = x;
	this.y = y;

	this.sprite = img;

	// speedMult and setSpeed used to create different speeds for images
	this.setSpeed();
	this.speed = speed * this.speedMult;

};

/**
 * Update position of background images to give the appearance
 * of moving through the desert
 * Parameter - dt, time delta between loops
 */
BkgdImages.prototype.update = function(dt) {
	this.x = this.x + this.speed * dt;

	// reset if out of bounds
	this.boundsCheck();
};

/**
 * Draw background images on the screen
 */
BkgdImages.prototype.render = function() {
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/**
 * Reset bkgd images if they pass left bounds
 */
BkgdImages.prototype.boundsCheck = function() {
	if (this.x <= leftBound) {
		this.x = 760;
	}
};

/**
 * Set speed of background images so sonic appears to be moving
 * speedMult var is used to multiply speed based on image param
 */
BkgdImages.prototype.setSpeed = function() {
	this.speedMult = - (20 + (10 * level));
};

/**
 * Pause movement of background images if user presses p,
 * or restart movement if user presses up arrow
 * Param - key, the key the user presses
 */
BkgdImages.prototype.pauseMotion = function(key) {
	if (key === 'p') {
		this.speed = 0;
	}
	if (key === 'up' && this.speed === 0) {
		var speed;
		// vary speed resets based on sprite image
		if (this.sprite === sunSprite)
			speed = 0;
		else if (this.sprite === cloudSprite)
			speed = 0.5;
		else if (this.sprite === cactusSprite || this.sprite === rockSprite)
			speed = 1;

		this.setSpeed();

		this.speed = speed * this.speedMult;
	}
};



// Place background images in array called bkgdImgs
var bkgdImgs = [];
var cactusSprite = 'images/cactus.png',
		rockSprite = 'images/rocks.png',
		cloudSprite = 'images/cloud.png',
		sunSprite = 'images/sun1.png';
var sunImg = new BkgdImages(570, 10, sunSprite, 0);
bkgdImgs.push(sunImg);
var cloudImg = new BkgdImages(380, 50, cloudSprite, 0.5);
bkgdImgs.push(cloudImg);
var cactus = new BkgdImages(170, 175, cactusSprite, 1);
bkgdImgs.push(cactus);
var rock = new BkgdImages(515, 210, rockSprite, 1);
bkgdImgs.push(rock);

// Place nyancat objects in array called nyancats
var nyancats = [];
var cat = new NyanCat();
nyancats.push(cat);

// Place zombie objects in array called zombies
var zombies = [];
var zombie = new Zombie();
zombies.push(zombie);

// create new instance of sonic
var sonic = new Sonic();


// Display player info above canvas
function keepScore() {
	var scoreString = 'Score: ' + sonic.score.toString();
	var levelString = ' | Level: ' + level.toString();
	var livesString = ' | Lives: ' + sonic.lives.toString();
    document.querySelector('#score').innerHTML = scoreString +
    	levelString + livesString;
}
	
// Listen for key presses and send input to handleInput()
document.addEventListener('keydown', function(e) {
	var allowedKeys = {
		13: 'enter',
		32: 'space',
	};
	sonic.handleInput(allowedKeys[e.keyCode]);
});

// Listen for pause and un-pause for moving elements
document.addEventListener('keyup', function(e) {
	var allowedKeys = {
		80: 'p',
		38: 'up',
	};

	nyancats.forEach(function(cat) {
		cat.pauseMotion(allowedKeys[e.keyCode]);
	});
	zombies.forEach(function(zombie) {
		zombie.pauseMotion(allowedKeys[e.keyCode]);
	});
	bkgdImgs.forEach(function(img) {
		img.pauseMotion(allowedKeys[e.keyCode]);
	});
	sonic.restartGame(allowedKeys[e.keyCode]);
});
