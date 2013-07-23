// Generates the modal window when an item is clicked
define(function(require) {
	
	// Dependencies
	var $ = require('jquery'),
		_ = require('underscore'),
		Backbone = require('backbone');

	// Create the template
	var template = '<div class="circle"></div>';
	
	// Color options
	var colors = ['#444444', '#649ba9', '#88a964', '#a9a264', '#a96464', '#bebebe', '#a369a5'];
	function randomColor() { return colors[Math.floor(Math.random()*colors.length)]; }
	
	// Init view
	var Circle = {
		parent: null,
		color: null,
		size: null,
		position: null,
		interval: null,
		x: null,
		y: null
	};
	
	// Constructor
	Circle.initialize = function(params) {
		_.bindAll(this);

		// Give the view some markup
		this.setElement(template);

		// Set initial dimensions		
		this.setProperties(params);

		// Main listeners for the circle
		this.$el.on('mouseenter', this.loopColors);
		this.$el.on('mouseleave', this.stopLoopColors);
		this.$el.on('click', this.onClick);

		// Listen for the color change trigger
		if (this.parent) this.parent.on('updateColor', this.onUpdateColor);

		// Set the circle's properties, then reveal
		_.defer(this.reveal);

	};

	// Circle Click Handler
	Circle.onClick = function(e) {
		var follower = new Circle({
			parent: this, 
			color: this.color, 
			size: this.size/2, 
			x: this.x, 
			y: this.y
		});
		$('.wrap').append(follower.el);
	};

	// Set the circle's diameter, and color
	Circle.setProperties = function(params) {

		// Set default values
		this.parent = params.parent;
		this.size = params.size || 200;
		this.color = params.color || randomColor();

		// If there is a parent, position this circle on it's edge
		if (params.parent) {
			
			// This circle is half of it's parent and "size" is a diameter.  So the distance between
			// parent and this circle is one and half of this circle's diameter.
			var radius = this.size*1.5,
			
				// This is the center of the parent
				center = { x: params.x - this.size/2 + this.size, y: params.y - this.size/2 + this.size},
				
				// Choose a random angle to position it
				angle = Math.random()*Math.PI*2;
				
			// Conver the angle and radius to x/y coordinates
			this.x = Math.cos(angle)*radius + center.x;
			this.y = Math.sin(angle)*radius + center.y;
			
		// Otherwise, center where clicked
		} else {
			this.x = params.x - this.size/2;
			this.y = params.y - this.size/2;
		}
		
		// Set the styles of the circle
		this.$el.css({
			'top': this.y,
			'left': this.x,
			'background-color': this.color,
			'width': this.size,
			'height': this.size
		});
	};

	// Loop through colors on rollvoer
	Circle.loopColors = function(e) {
		this.chooseColorAndApply();
		this.interval = setInterval(this.chooseColorAndApply, 300);
	};

	// Change the color of this circle and notify listeners
	Circle.chooseColorAndApply = function(e) {
		this.applyColor(randomColor());
	};
	
	// Apply a color
	Circle.applyColor = function(color) {
		this.color = color;
		this.$el.css({'background-color': color });
		
		// Delay notifying listeners to add a cool stagger affect
		setTimeout(_.bind(function() {
			this.trigger('updateColor', {color: color});
		}, this), 100);
		
	};

	// Stop looping through colors
	Circle.stopLoopColors = function(e) {
		if(!this.interval) return;
		clearInterval(this.interval);
		this.interval = null;
	};
	
	// Listen for another circle's color to change
	Circle.onUpdateColor = function(e) {
		this.applyColor(e.color);
	};

	// Revel the circle the first time
	Circle.reveal = function() {
		this.$el.addClass('on');
	};
	
	// Return the view
	Circle =  Backbone.View.extend(Circle);
	return Circle;

});