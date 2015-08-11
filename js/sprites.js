var Sprites = (function(global) {

	/*
	var sonicSprite = new Image();
	sonicSprite.src = "images/sonicsprites.png";
	*/
	var sonic,
		soniceSprite;

	// update and render sprite at same speed as browser redraws
	function gameLoop() {
		window.requestAnimationFrame(gameLoop);
		sonic.update();
		sonic.render();
	}

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
		// obj.numberOfFrames = options.numberOfFrames || 1;

		// obj.loop = options.loop;
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
			// clear the canvas
			obj.context.clearRect(0, 0, obj.width, obj.height);

			// draw animation
			obj.context.drawImage(
				obj.image,
				frameIndex * obj.width / numberOfFrames,
				0,
				obj.width / numberOfFrames,
				obj.height,
				0,
				0,
				obj.width / numberOfFrames,
				obj.height);
		};
		
		// obj.render();

		return obj;
	}

	sonicSprite = new Image();

	sonic = sprite({
		context: ctx,
		width: 408.8,
		height: 117,
		image: sonicSprite,
		numberOfFrames: 4,
		ticksPerFrame: 3
	});

	// start game loop as soon as sprite sheet is loaded
	sonicSprite.addEventListener("load", gameLoop);
	sonicSprite.src = "images/sonicrunningsheet.png";
}());