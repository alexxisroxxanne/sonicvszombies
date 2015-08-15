var sonicSprite,
	soniceSpriteImg;

var jumpingSprite,
	jumpingSpriteImg;

var Sprites = (function(global) {

	/*
	var sonicSprite = new Image();
	sonicSprite.src = "images/sonicsprites.png";
	*/


	// update and render sprite at same speed as browser redraws
	function gameLoop() {
		window.requestAnimationFrame(gameLoop);
		ctx.clearRect(0, 0, 760, 608);
		sonicSprite.update();
		sonicSprite.render();
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
		obj.x = options.x || 30;
		obj.y = options.y || 250;
		obj.jumping = false;

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
			// obj.context.clearRect(0, 0, obj.width, obj.height);
			switch(obj.jumping) {
				case false:
					obj.y = 250;
				break;
				case true:
					obj.y = 50;
				break;
			}

			// draw animation
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

		obj.jump = function(key) {
			if (key === "space" || key === "enter") {

				//var jumpImg = obj.image;
				// var pat = obj.ctx.createPattern(jumpImg, "no-repeat");

				setTimeout(function() {
					/*
					obj.context.beginPath();
					obj.context.fillStyle = pat;
					obj.context.moveTo(30, 250);
					obj.context.lineTo(30, 75);
					// ctx.lineTo(30, 250);
					obj.context.fill();
					
					//this.speed = 70;
					//this.y = this.y + this.speed * dt;
					*/
					obj.jumping = true;
					
				}, 1500);
			}

			console.log("jumping");
		};
				
		// obj.render();

		return obj;
	}

	sonicSpriteImg = new Image();

	sonicSprite = sprite({
		context: ctx,
		width: 408.8,
		height: 117,
		image: sonicSpriteImg,
		numberOfFrames: 4,
		ticksPerFrame: 6
	});
	
	// start game loop as soon as sprite sheet is loaded
	sonicSpriteImg.addEventListener("load", gameLoop);
	sonicSpriteImg.src = "images/sonicrunningsheet.png";
	console.log("Sprites file is opened");
	/*
	jumpingSpriteImg = new Image();

	jumpingSprite = sprite({
			context: ctx,
			width: 920,
			height: 117,
			image: jumpingSpriteImg,
			numberOfFrames: 9,
			ticksPerFrame: 6
	});

	jumpingSpriteImg.src = "images/sonicjumping.png";
	*
	sonicSprite.addEventListener("keyup", function(e) {
		var allowedKeys = {
			13: "enter",
			32: "space"
		};

		sonicSprite.jump(allowedKeys[e.keyCode]);
	});	
	*/
}());