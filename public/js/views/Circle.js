// Generates the modal window when an item is clicked
define(function(require) {
	
	// Dependencies
	var $ = require('jquery'),
		_ = require('underscore'),
		Backbone = require('backbone'),
		app = require('modules/app');

	// Create the template
	var template = _.template($('#template-circle').html() || '');
	
	// Init view
	var Circle = {
		colors: ['#ffffff', '#666666', '#9d1b3c', '#c8c826', '#1ce2db', '#a641ce', '#25d439'],
		params: null,
		parent: null,
		bgColor: null,
		size: null,
		position: null,
		mouseX: null,
		mouseY: null,
		interval: null
	};
	
	// Constructor
	Circle.initialize = function(params) {
		_.bindAll(this);

		// establish the element of the view as a copy of the "Circle" underscore template
		this.setElement(template());

		this.params = params;

		if(params.parent) {
			this.parent = params.parent;
			this.size = this.parent.size;
		} else {
			this.size = params.size;
		}

		// Elements
		this.$circle = this.$el.find('.circle');

		// click listener for the circle
		this.$circle.on('click', this.onClick);

		// set the rollover if it's NOT the parent, 
		// else set the roll out, then on roll out set the roll over
		this.$circle.on('mouseenter', this.loopColors);
		this.$circle.on('mouseleave', this.onMouseLeave);
		
		// listen for the color change trigger
		if(this.parent) this.parent.on('updateColor', this.onUpdateColor);

		// set the circle's properties
		_.defer(this.setProperties);

		// Initial circle reveal
		_.defer(this.reveal);

	};

	// Circle Click Handler
	Circle.onClick = function(e) {
		e.preventDefault();
		var follower = new Circle({parent: this, color: this.bgColor, size: this.size});
		this.$el.append(follower.$el);
	};

	// Set the circle's diameter, and color (PARENT)
	Circle.setProperties = function() {

		// SIZE: set the view's size based on the circle's width
		var size;
		if(!this.parent) {
			size = this.size;
		} else {
			size = this.parent.$circle.width()/2;
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
			top = ((Math.random()*(size*4))) - (size*2);
			left = ((Math.random()*(size*4))) - (size*2);
		}
		
		// set the styles of the wrapper
		this.$el.css({
			'top': top,
			'left': left
		});

		// set the styles of the circle
		this.$circle.css({
			'background-color': this.bgColor,
			'width': size,
			'height': size
		});
	};

	Circle.onMouseLeave = function(e) {
		if(interval) {
			clearInterval(interval);
			interval = null;
		}
	};

	Circle.loopColors = function(e) {
		interval = setInterval(this.changeColor, 300);
	};

	Circle.changeColor = function(e) {
		this.bgColor = this.colors[Math.floor(Math.random()*this.colors.length)];
		this.$circle.css({'background-color': this.bgColor });
		this.trigger('updateColor', {color: this.bgColor});

	};

	Circle.onUpdateColor = function(e) {
		if(this.parent) {
			this.bgColor = e.color;
			this.$circle.css({'background-color': this.bgColor });	
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