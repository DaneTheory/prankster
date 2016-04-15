var MEMES = [
	'http://vignette4.wikia.nocookie.net/meme/images/3/3d/LOLGuy.png/revision/latest?cb=20110821045825',
	'http://i3.kym-cdn.com/photos/images/newsfeed/000/348/126/415.png',
	'http://orig07.deviantart.net/a7d7/f/2012/151/5/2/meme_me_encanta_png_by_agustifran-d51rxv9.png',
	'http://img07.deviantart.net/6362/i/2012/208/f/4/meme_forever_alone_feliz_png_by_mfsyrcm-d58vlpc.png',
	'http://img02.deviantart.net/e950/i/2012/210/d/5/meme_pensando_png_by_mfsyrcm-d5949t0.png',
	'http://img06.deviantart.net/4256/i/2012/211/f/f/meme_mierda_png_by_mfsyrcm-d595tch.png',
	'http://orig12.deviantart.net/0847/f/2012/087/e/b/memes_png_by_cattagleek-d4u9kd3.png',
	'http://orig07.deviantart.net/8afe/f/2012/110/f/7/memes_png_by_unbrokentutorials-d4wy4y0.png',
	'http://i1.kym-cdn.com/photos/images/original/000/538/955/4a3.png',
	'http://i3.kym-cdn.com/photos/images/original/000/103/740/c2c.png',
	'http://4.bp.blogspot.com/-fLr2N7V1Cqg/VWVbNprDhsI/AAAAAAAAANg/x4FwCTsuUyg/s1600/Render%2B-%2BMeme%2BWhyyyyy%2BTroll%2BFace%2BBaixe%2BRenders.png',
	'http://i2.kym-cdn.com/photos/images/original/000/245/728/0c9.png',
	'http://wallpoper.com/images/00/28/37/87/meme-gtfo_00283787.png',
	'http://3.bp.blogspot.com/-zZSnBDQPah0/UtJI3j8SB4I/AAAAAAAAAic/8_8kXGR9lVU/s1600/2069_sherlock-holmes-prev.png',
	'http://images5.fanpop.com/image/photos/26700000/Pelin-Karahan-turkish-actors-and-actresses-26715696-400-454.png',
	'http://media.jsonline.com/images/bond_daniel.png',
	'http://www.alux.com/wp-content/uploads/2014/04/richest-male-actors-in-the-world-2014-will-smith.png',
	'http://orig13.deviantart.net/9950/f/2014/183/8/6/song_hye_kyo_png_by_milenaho-d7ovmkb.png'
];

var Prankster = function(params) {
	this.images = params.images ? params.images : null;
	this.delay = params.delay? params.delay : 5000;
	this.initialDelay = params.initialDelay ? params.initialDelay : 1000;
	this.time = params.time ? params.time : -1;
	this.stop = false;

	var self = this;
	if(!this.images) {
		self.showAlert('Please add some Images using "images" attribute.');
		return;
	}

	setTimeout(function() {
		setTimeout(function() {
			self.showImage();
		}, this.delay); // Call the Prank after each delay
	}, this.initialDelay); // set up initial delay to the prank

	/* Stop animation */
	if(this.time > 0) {
		setTimeout(function() {
			self.destroy();
		}, this.time);
	}
}

Prankster.prototype.destroy = function () {
	this.stop = true;
}

Prankster.prototype.showAlert = function(msg) {
	var span = $("<span />", {
		class: 'alert bad',
		text: msg
	});

	$("body").append(span);

	span.show();

	setTimeout(function () {
		span.hide();
	}, 5000);
}

Prankster.prototype.getRandom = function(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}

Prankster.prototype.getRandomBlock = function() {
	return $('div:visible')[this.getRandom(0, $('div:visible').length-1)];
}

Prankster.prototype.getRandomImage = function() {
	return this.images[this.getRandom(0, this.images.length-1)];
}

Prankster.prototype.showImage = function() {
	if(this.stop) return;

	var image = this.getRandomImage();
	var div = $(this.getRandomBlock());

	if(image && div) {

		$('.selected_prank_div').removeClass('selected_prank_div');

		div.addClass('selected_prank_div');

		div.css('z-index', 9999);

		var p = $("<img />", {
			class: 'Prankster_image',
			src: image
		}).appendTo(div);

		p.css({'top': div.offset().top, 'left': div.offset().left, 'width': div.width(), 'opacity': 0, 'z-index': -1});

		var randomHeight = this.getRandom(80, parseFloat(p.css('height')));

		p.css({'clip': 'rect(0px ' + p.css('width') + ' ' + randomHeight + 'px 0px)'});

		// Show the Image
		if(div.offset().top > randomHeight) {
			// Show it on the top of the block
			p.css({'opacity': 1});
			p.css('top', parseFloat(p.css('top')) - randomHeight + 'px');

			// Hide it back
			setTimeout(function() {
				p.css('top', parseFloat(p.css('top')) + randomHeight + 'px');
				p.css({'opacity': 0});
			}, 2000);
		}

		// remove it from the DOM
		setTimeout(function () {
			p.remove();
		}, 4000);

		// Recursive approach
		var self = this;
		setTimeout(function() {
			self.showImage();
		}, this.delay); // Call the Prank after each delay

	} else {

		this.showAlert('Please add some content.');
		return;
	}
}