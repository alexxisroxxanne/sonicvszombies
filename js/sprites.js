


var sonicSprite = new Image();
sonicSprite.src = "images/sonicsprites.png";


function sprite(options) {

	var obj = {};

	obj.context = ctx;
	obj.width = options.width;
	obj.height = options.height;
	obj.image = options.image;

	obj.render = function() {
		// draw animation
		obj.context.drawImage(
			obj.image,
			0,
			0,
			obj.width,
			obj.height,
			0,
			0,
			obj.width,
			obj.height);
	};

	obj.update = function() {
		tickCount += 1;
	}


	obj.render();


	return obj;
}

var spriteObj = sprite({
	context: ctx,
	width: 102.2,
	height: 117,
	image: sonicSprite
});