/*
	engine.js
	---------
	Sonic vs. Zombies
	-----------------
	Alexxis Johnson - Aug. 9th, 2015
	--------------------------------
	Engine provides game loop by redrawing the screen/canvas over and
	over to appear as if the game is running a smooth animation. It 
	draws the initial game board on the screen and then repeatedly
	calls the update and render methods to create the animation loop.
	Engine is available as a global variable and makes the canvas context (ctx)
	available globally as well, so that other files have easier access
	to these objects.
*/

"use strict";

var Engine = (function(global) {
	/*
		Create canvas and scope-wide variables
	*/
	var doc = global.document,
		win = global.window,
		canvas = doc.createElement('canvas'),
		ctx = canvas.getContext('2d'),
		lastTime;

	canvas.width = 760;
	canvas.height = 608;
	doc.body.appendChild(canvas);

	/*
		main function provides game loop and calls render and update
		functions
	*/
	function main() {
		// time delta information creates smooth animation based on time
		var now = Date.now();
		var dt = (now - lastTime) / 1000.0;

		// call update function with time delta parameter for smooth
		// animation and call render to load screen
		update(dt);
		render();

		// set lastTime variable to now
		lastTime = now;

		// use browser's requestAnimationFrame function to call main
		// again when browswer can draw another frame
		win.requestAnimationFrame(main);

		keepScore();
	};

	/*
		init function occurs once to setup game loop
	*/
	function init() {
		reset();

		// lastTime required for game loop
		lastTime = Date.now();

		main();
	}

	/*
		update calls other updating methodds
	*/
	function update(dt) {
		updateEntities(dt);
	}

	/*
		updateEntities uses the time delta parameter to update the 
		location/other properties of the sprites in the game
	*/
	function updateEntities(dt) {
		sonic.update();

		zombies.forEach(function(zombie) {
			zombie.update(dt);
		});

		nyancats.forEach(function(cat) {
			cat.update(dt);
		});

		bkgdImgs.forEach(function(img) {
			img.update(dt);
		});
	}

	/*
		render redraws the game for every loop, similar to a flip book -
		intended to look like smooth animation
	*/
	function render() {
		// create array of background images
		var bkgdRowImgs = [
			"images/sky2.png", // top row is second level of sky
			"images/sky1.png", // first level of sky
			"images/sand1.png"]; // top level of sand
		var numRows = 3,
			numCols = 5,
			row, col;

		// draw background using images in the row/column / grid format
		for (row = 0; row < numRows; row++) {
			for (col = 0; col < numCols; col++) {
				// use drawImage function of canvas to draw background
				// on canvas; using Resources to cache images b/c they
				// are used over and over
				ctx.drawImage(Resources.get(bkgdRowImgs[row]), col * 152, row * 152);
			}
		}

		//ctx.strokeText("press enter to start", 300, 200);
		if (sonic.lives > 0 && sonic.ready == true)
			renderEntities();
		else {
			ctx.font = "30px monospace";
			ctx.textAlign = "center";
			ctx.fillStyle = "palevioletred";
			if (sonic.ready = true)
				ctx.fillText("Press up arrow twice to play again", canvas.width/2, 200);
			else if (sonic.ready = false)
				ctx.fillText("Press enter to start");
		}
	}

	/*
		renderEntities is called by render on each game loop and calls
		the render functions specific to each game entity
	*/
	function renderEntities() {
		bkgdImgs.forEach(function(img) {
			img.render();
		});

		nyancats.forEach(function(cat) {
			cat.render();
		});

		zombies.forEach(function(zombie) {
			zombie.render();
		});

		sonic.render();


	}

	/*
		reset handles gameover and new game screens
	*/
	function reset() {
		// display final score
		// to play again, press enter
		sonic.lives = 3;
		level = 1;
		sonic.score = 0;
	}

	/*
		Load all images needed for game; call init once the images are
		loaded
	*/
	Resources.load([
		"images/sky2.png",
		"images/sky1.png",
		"images/sand1.png",
		"images/sonicrunningsheet.png",
		"images/sonicstill.png",
		"images/sonicsprites.png",
		"images/sonicjumping.png",
		"images/nyancat.png",
		"images/zombie.png",
		"images/sun1.png",
		"images/cactus.png",
		"images/cloud.png",
		"images/rocks.png",
		"images/play-button.png"
	]);
	Resources.onReady(init);

	/*
		Assign canvas context to global variable so that it is
		easier accessed in other files
	*/
	global.ctx = ctx;
})(this);
