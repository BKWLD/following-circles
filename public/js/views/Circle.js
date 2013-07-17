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
 		params: null
	};
	
	// Constructor
	View.initialize = function(params) {
		_.bindAll(this);

		// set params of the view = the passed params
		this.params = params;

		// establish the element of the view as a copy of the "Circle" underscore template
		this.setElement(template());

		// Selectors
		this.$wrap = $('.wrap');

		this.setPosition();
	
	};

	View.setPosition = function() {

		// figure out the coordinates to place the circle
		var top = parseInt(this.params.pageY - 50),
			left = parseInt(this.params.pageX - 50);

		// position the new circle
		this.$el.css({'top': top, 'left': left});
	
	};
	
	// Return the view
	return Backbone.View.extend(View);
	
});