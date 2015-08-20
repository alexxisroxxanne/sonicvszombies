/**
 * sprites.js
 * ----------
 * Alexxis Johnson - August 19th, 2015
 * -----------------------------------
 * Sprites file and class handles the player's sprite animation. It
 * It takes a sprite sheet and renders each frame to give the illusion
 * that the sprite is moving.
 */


// vars for sprites, defined globally for easier access across files
var sonicSprite,
	sonicSpriteImg;
var jumpingSprite,
	jumpingSpriteImg;


var Sprites = (function(global) {
	// update and render sprite at same speed as browser redraws
	function gameLoop() {
		window.requestAnimationFrame(gameLoop);
		ctx.clearRect(0, 0, 760, 608);
		sonicSprite.update();
		sonicSprite.render();
	}

	/**
	 * sprite function creates the sprite object
	 * also has internal functions, such as update and render, that
	 * draw the sprite on the screen and animate it
	 * param - options, the object passed in that defines the sprite's
	 * 	properties, such as height and width
   */
	function sprite(options) {

		var obj = {},
			// current frame
			frameIndex = 0,
			// number of updates since current frame was displayed
			tickCount = 0,
			// number of updates until next frame should be displayed
			ticksPerFrame = options.ticksPerFrame || 0;
			// number of frames in sprite sheet
			numberOfFrames = options.numberOfFrames || 1;

		obj.context = options.context;	
		obj.width = options.width;
		obj.height = options.height;
		obj.image = options.image;
		obj.x = options.x || 30;
		obj.y = options.y || 250;
		obj.jumping = 1;

		obj.update = function() {
			tickCount += 1;

			// reset tickCount once it is surpasses ticks per frame
			if (tickCount > ticksPerFrame) {
				tickCount = 0;

				// increase frameIndex if it is less than number of frames
				if (frameIndex < numberOfFrames - 1) {
					// go to next frame
					frameIndex += 1;
				} else {
					// reset frameIndex to loop if out of frames
					frameIndex = 0;
				}
			}
		};
		
		obj.render = function() {
			// render different sprites if player is jumping or not
			switch(obj.jumping) {
				case 1:
					// player is not jumping
					obj.y = 250;
					obj.image = sonicSpriteImg;
					obj.numberOfFrames = 4;
				break;
				case 2:
					// player is mid-jump
					obj.image = jumpingSpriteImg;
					obj.numberOfFrames = 9;
					if (obj.y > 50)
						obj.y -= 20;
					else if (obj.y == 50)
						obj.y = 50;
				break;
				case 3:
					// player is descending from jump
					if (obj.y < 250) {
						obj.y += 10;
						obj.image = jumpingSpriteImg;
						obj.numberOfFrames = 9;
					}
					else {
						obj.y = 250;
						obj.image  = sonicSpriteImg;
						obj.numberOfFrames = 4;
					}
				break;
			}

			// draw animation on canvas
			obj.context.drawImage(
				obj.image,
				frameIndex * obj.width / numberOfFrames,
				0,
				obj.width / numberOfFrames,
				obj.height,
				30,
				obj.y,
				obj.width / numberOfFrames,
				obj.height);
		};

		// toggle jumping state when key is pressed
		obj.jump = function(key) {
			if (key === 'space' || key === 'enter') {
				obj.jumping = 2;

				/**
				 * FIXME: figure out how to keep jump animation from spazzing
				 * 	when player holds down jumping keys
				 */
				setTimeout(function() {
					obj.jumping = 3;
				}, 800);
			}
			
			console.log('jumping');
		};
		
		return obj;
	}

	// set img vars to images
	sonicSpriteImg = new Image();
	jumpingSpriteImg = new Image();

	// create sonicSprite
	sonicSprite = sprite({
		context: ctx,
		width: 408.8,
		height: 117,
		image: sonicSpriteImg,
		numberOfFrames: 4,
		ticksPerFrame: 6,
	});
	
	// start game loop as soon as sprite sheet is loaded
	sonicSpriteImg.addEventListener('load', gameLoop);
	sonicSpriteImg.src = 'images/sonicrunningsheet.png';
	jumpingSpriteImg.src = 'images/sonicjumping.png';

}());
