// Generates the modal window when an item is clicked
define(function(require) {
	
	// Dependencies
	var $ = require('jquery'),
		_ = require('underscore'),
		Backbone = require('backbone');

	// Create the template
	var template = _.template($('#template-circle').html() || '');
	
	// Init view
	var View = {
		params: null,
		colors: ['#ffffff', '#333333', '#9d1b3c', '#c8c826', '#1ce2db', '#a641ce', '#25d439']
	};
	
	// Constructor
	View.initialize = function(params) {
		_.bindAll(this);

		// set params of the view = the passed params
		this.params = params;

		// establish the element of the view as a copy of the "Circle" underscore template
		this.setElement(template());

		//randomize the circle's properties
		_.defer(this.setProperties);

		// set it's initial position
		_.defer(this.setPosition);

		// click listener for the circle
		this.$el.on('click', this.onClick);
	};

	View.onClick = function(e) {
		e.preventDefault();

		// change color
	};

	// Set the circle's diameter, and color
	View.setProperties = function() {

		// random size (between 10 and 100 pixels)
		var size = (Math.round(Math.random() * 150) + 10);
		this.$el.css({'width': size + 'px', 'height': size + 'px', 'border-radius': size/2 + 'px'});


		// random color from the colors array
		var randColor = Math.floor(Math.random()*this.colors.length);
		this.$el.css('background-color', this.colors[randColor]);
	};

	View.setPosition = function() {

		// figure out the coordinates to place the circle
		var top = this.params.pageY - 50,
			left = this.params.pageX - 50;

		// position the new circle
		this.$el.css({'top': top, 'left': left});
	
	};
	
	// Return the view
	return Backbone.View.extend(View);
	
});