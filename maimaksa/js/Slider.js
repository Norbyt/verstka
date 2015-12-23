window.addEventListener('load', function () {
	for (var i = 0; i < sf('.sf-slider').length; i ++) {
		var slider = new Slider(sf('.sf-slider')[i]);
	}
}, true);

function Slider (sliderNode) {

	this.begin = function () {
		var self = this;
		sliderNode.style['position'] = 'relative';
		self.speed = sliderNode.hasAttribute('speed') ? (sliderNode.getAttribute('speed') ? sliderNode.getAttribute('speed') : 3.5) : 3.5;
		self.timer = sliderNode.hasAttribute('autoslide') ? (sliderNode.getAttribute('autoslide') ? sliderNode.getAttribute('autoslide') : 5) : '';
		self.direction = sliderNode.hasAttribute('direction') ? (sliderNode.getAttribute('direction') ? sliderNode.getAttribute('direction') : 'right') : 'right';
		sf('.' + self.slidesClass, sliderNode) ? self.initSlides() : '';
		sf('.' + self.dotsClass, sliderNode) ? self.initDots() : '';
		sf('.' + self.controlsClass, sliderNode) ? self.initControls() : '';
		self.timer ? self.initAutoslide() : '';
	}

	this.initSlides = function () {
		var self = this;
		var slidesNode = sf('.' + self.slidesClass, sliderNode);
		slidesNode.css('position', 'relative');
		slidesNode.css('overflow', 'hidden');
		var slides = sf('.' + self.slidesClass + ' > *', sliderNode);
		slides && slides.length > 0 ? [
			slides[0].setAttribute('status', 'active'),
			slides.css('width', '100%'),
			slides.css('height', '100%'),
			slides.css('position', 'absolute'),
			slides.css('top', '0'),
			slides.css('left', '0'),
			slides.css('opacity', '0'),
			slides.css('transition', (5 - self.speed) + 's'),
			slides[0].style['opacity'] = '1'
		] : '';
	}

	this.initDots = function () {
		var self = this;
		var dotsNode = sf('.' + self.dotsClass, sliderNode);
		dotsNode.css('z-index', '100');
		var dots = sf('.' + self.dotsClass + ' > *', sliderNode);
		if (dots && dots.length > 0) {
			dots[0].setAttribute('status', 'active');
			for (var i = 0; i < dots.length; i ++) {
				dots[i].onclick = function (i, dots) {
					return function () {
						self.showSlide(i);
						self.checkDot(i);
						self.rebootInterval();
					}
				}(i, dots);
			}
		}
	}

	this.initControls = function () {
		var self = this;
		var controlsNode = sf('.' + self.controlsClass, sliderNode);
		controlsNode.css('z-index', '100');
		var control_left = sf('.' + self.controlsClass + ' > *.left', sliderNode)[0];
		var control_right = sf('.' + self.controlsClass + ' > *.right', sliderNode)[0];
		var control_top = sf('.' + self.controlsClass + ' > *.top', sliderNode)[0];
		var control_bottom = sf('.' + self.controlsClass + ' > *.bottom', sliderNode)[0];

		control_left ? control_left.onclick = function () { self.showPrevSlide(); self.rebootInterval(); } : '';
		control_right ? control_right.onclick = function () { self.showNextSlide(); self.rebootInterval(); } : '';
		control_top ? control_top.onclick = function () { self.showPrevSlide(); self.rebootInterval(); } : '';
		control_bottom ? control_bottom.onclick = function () { self.showNextSlide(); self.rebootInterval(); } : '';
	}

	this.initAutoslide = function () {
		var self = this;
		self.interaval = setInterval(function() { self.direction == 'right' || self.direction == 'bottom' ? self.showNextSlide() : self.showPrevSlide(); }, self.timer * 1000);
	}

	this.showSlide = function (i) {
		var self = this;
		var slides = sf('.' + self.slidesClass + ' > *', sliderNode);
		var now = self.getActiveSlide();
		slides.css('opacity', '0');
		slides.attr('status', '');
		slides[i].style['opacity'] = '1';
		slides[i].setAttribute('status', 'active');
	}

	this.showNextSlide = function () {
		var self = this;
		var count = sf('.' + self.slidesClass + ' > *', sliderNode).length;
		var dots = sf('.' + self.dotsClass + ' > *', sliderNode);
		var now = self.getActiveSlide();
		var i = (now + 1 >= count) ? 0 : now + 1;
		self.showSlide(i);
		(dots && dots.length > 0) ? self.checkDot(i) : '';
	}
	this.showPrevSlide = function () {
		var self = this;
		var count = sf('.' + self.slidesClass + ' > *', sliderNode).length;
		var dots = sf('.' + self.dotsClass + ' > *', sliderNode);
		var now = self.getActiveSlide();
		i = (now - 1 < 0) ? count - 1 : now - 1;
		self.showSlide(i);
		(dots && dots.length > 0) ? self.checkDot(i) : '';
	}

	this.checkDot = function (i) {
		var self = this;
		var dots = sf('.' + self.dotsClass + ' > *', sliderNode);
		dots.attr('status', '');
		dots[i].setAttribute('status', 'active');
	}

	this.getActiveSlide = function () {
		var self = this;
		var slides = sf('.' + self.slidesClass + ' > *', sliderNode);
		for (var i = 0; i < slides.length; i ++) {
			if (slides[i].hasAttribute('status') && slides[i].getAttribute('status') == 'active') {
				var tmp = i;
				break;
			}
		}
		return tmp;
	}

	this.rebootInterval = function () {
		var self = this;
		self.interaval ? [
			clearInterval(self.interaval),
			self.timer ? self.initAutoslide(self.timer) : '',
		] : '';
	}

	/**Constructor-------------------------------------------**/

		this.slidesClass = 'sf-slider-slides';
		this.dotsClass = 'sf-slider-dots';
		this.controlsClass = 'sf-slider-controls';
		this.begin();

	/**----------------------------------------------------------**/
}
