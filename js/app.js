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
*/
var Sonic = function() {

};

Sonic.prototype.handleInput = function(key) {
	if (key === "enter")
		// start game etc.
	if (key === "space")
		// jump
};

/*
*/
var Zombie = function() {

};

/*
*/
var NyanCat = function() {

};

/*
*/
var BkgdImages = function() {

};


var sonic = new Sonic();

var zombies = [];
var zombie;

var nyancats = [];
var cat;

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