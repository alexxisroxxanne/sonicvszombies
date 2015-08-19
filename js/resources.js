/*
	resources.js
	------------
	Sonic vs. Zombies
	-----------------
	Alexxis Johnson - Aug. 9th, 2015
	--------------------------------
	Resources loads and caches images that are used and reused in the
	game in order to smooth and speed up game animation

*/

'use strict';

(function() {
	var resourceCache = {};
	var loading = [];
	var readyCallbacks = [];

	/*
		load is available publicly with a parameter that accepts and
		image url or an image array. It calls the private image loading
		function of this class to load and cache images
	*/
	function load(urlOrArr) {
		if (urlOrArr instanceof Array) {
			// loop through each value if param passed is array
			urlOrArr.forEach(function(url) {
				_load(url);
			});
		} else {
			// assume value passed is one image url and load
			_load(urlOrArr);
		}
	};

	/*
		private load function that is called by public load function
		loads and caches images
	*/
	function _load(url) {
		if (resourceCache[url]) {
			// return image if it already exists within the cache
			return resourceCache[url];
		} else {
			// load image if it is not present in cache
			var img = new Image();
			img.onload = function() {
				// add img to cache after loading
				resourceCache[url] = img;

				// call onReady() callbacks once image is loaded and
				// cached
				if (isReady()) {
					readyCallbacks.forEach(function(func) {func(); });
				}
			};
			// set initial cache value to false
			resourceCache[url] = false;
			// set image source to passed URL
			img.src = url;
		}
	};

	/*
		get is used to grab images that have been loaded/cached
	*/
	function get(url) {
		return resourceCache[url];
	};

	/*
		isReady determines if images have been loaded
	*/
	function isReady() {
		var ready = true;
		for (var k in resourceCache) {
			if (resourceCache.hasOwnProperty(k) && !resourceCache[k]) {
				ready = false;
			}
		}
		return ready;
	};

	/*
		onReady adds func parameter to the callback stack that is called
		when images are loaded
	*/
	function onReady(func) {
		readyCallbacks.push(func);
	};

	/*
		Define publicly accessible functions in Resources object
	*/
	window.Resources = {
		load: load,
		get: get,
		onReady: onReady,
		isReady: isReady
	};
})();
