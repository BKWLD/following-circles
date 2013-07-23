// Generates the modal window when an item is clicked
define(function(require) {
	
	// Dependencies
	var $ = require('jquery'),
		_ = require('underscore'),
		Backbone = require('backbone');

	// Create the template
	var template = '<div class="circle"></div>';
	
	// Init view
	var Circle = {
		colors: ['#444444', '#649ba9', '#88a964', '#a9a264', '#a96464', '#bebebe', '#a369a5'],
		params: null,
		parent: null,
		bgColor: null,
		size: null,
		position: null,
		interval: null,
		x: null,
		y: null
	};
	
	// Constructor
	Circle.initialize = function(params) {
		_.bindAll(this);

		// Establish the element of the view as a copy of the "Circle" underscore template
		this.setElement(template);

		// Remember the configuration params
		this.params = params;

		if(params.parent) {
			this.parent = params.parent;
			this.size = this.parent.size;
		} else {
			this.size = params.size;
		}

		this.x = this.params.x;
		this.y = this.params.y;

		// Main listeners for the circle
		this.$el.on('mouseenter', this.loopColors);
		this.$el.on('mouseleave', this.onMouseLeave);
		this.$el.on('click', this.onClick);

		// Listen for the color change trigger
		if(this.parent) this.parent.on('updateColor', this.onUpdateColor);

		// Set the circle's properties, then reveal
		_.defer(this.setProperties);
		_.defer(this.reveal);

	};

	// Circle Click Handler
	Circle.onClick = function(e) {
		e.preventDefault();
		var follower = new Circle({parent: this, color: this.bgColor, size: this.size, x: this.x, y: this.y});
		$('.wrap').append(follower.$el);
	};

	// Set the circle's diameter, and color (PARENT)
	Circle.setProperties = function() {

		// SIZE: set the view's size based on the circle's width
		var size;
		if(!this.parent) {
			size = this.size;
		} else {
			size = this.parent.$el.width()/2;
		}

		// COLOR: If no parent, then make the color random
		// else, make the color the color of the parent
		if(!this.parent) {
			this.bgColor = this.colors[Math.floor(Math.random()*this.colors.length)];
		} else {
			this.bgColor = this.params.color;
		}

		// if parent, then make the position be the mouse X&Y
		// else, then make it random relative to it's parent
		var top, left;
		if(!this.parent) {
			top = this.params.y - this.params.size/2;
			left = this.params.x - this.params.size/2;
		} else {
			top = this.parent.y + ((Math.random()*(size*4) - (size*2)));
			left = this.parent.x + ((Math.random()*(size*4) - (size*2)));
		}

		// set the styles of the circle
		this.$el.css({
			'top': top,
			'left': left,
			'background-color': this.bgColor,
			'width': size,
			'height': size
		});
	};

	Circle.onMouseLeave = function(e) {
		if(this.interval) {
			clearInterval(this.interval);
			this.interval = null;
		}
	};

	Circle.loopColors = function(e) {
		this.interval = setInterval(this.changeColor, 300);
	};

	Circle.changeColor = function(e) {
		this.bgColor = this.colors[Math.floor(Math.random()*this.colors.length)];
		this.$el.css({'background-color': this.bgColor });
		this.trigger('updateColor', {color: this.bgColor});

	};

	Circle.onUpdateColor = function(e) {
		if(this.parent) {
			this.bgColor = e.color;
			this.$el.css({'background-color': this.bgColor });	
			this.trigger('updateColor', {color: this.bgColor});
		}
	};

	// Revel the circle the first time
	Circle.reveal = function() {
		this.$el.addClass('on');
	};
	
	// Return the view
	Circle =  Backbone.View.extend(Circle);
	return Circle;

});