// Generates the modal window when an item is clicked
define(function(require) {
	
	// Dependencies
	var $ = require('jquery'),
		_ = require('underscore'),
		Backbone = require('backbone'),
		app = require('modules/app');

	// Create the template
	var template = _.template($('#template-child-circle').html() || '');
	
	// Init view
	var Circle = {
		parent: null,
		bgColor: null,
		size: null,
		parentSize: null,
		position: null
	};
	
	// Constructor
	Circle.initialize = function(params) {
		_.bindAll(this);

		// set the child's properties based on the 
		// circle that created it
		this.parent = params.parent;
		this.bgColor = params.color;
		this.parentSize = params.size;

		// establish the element of the view as a copy of the "Circle" underscore template
		this.setElement(template());

		// Elements
		this.$wrap = this.$el;
		this.$circle = this.$el.find('.circle');

		// try and find a unique index so I can cascade the changes
		// console.log(this.$el.index());

		// click listener for the circle
		this.$circle.on('click', this.onClick);

		// set the properties of the child
		this.setProperties();

	};
	
	// Set the properties of the child
	Circle.setProperties = function() {

		// set the color to the parent's color
		this.$circle.css('background-color', this.bgColor);

		// set the size to be 1/2 of the parent
		this.size = this.parentSize/2;
		this.$circle.css({'width': this.size, 'height': this.size});

		// set the position to a random x & y based on the size
		// of it's parent
		var randX = (Math.random()*this.parentSize*1.5) - (this.parentSize/4),
			randY = (Math.random()*this.parentSize*1.5) - (this.parentSize/4);

		this.positon = {x: randX, y: randY};
		this.$el.css({'top': randY, 'left': randX});

	};

	// spawn yet another child
	Circle.onClick = function() {

		console.log(Circle);

		// spawn a child circle relative to the parent
		var child = new Circle();
		//this.$el.append(child.$el);

	};

	// Return the view
	return Backbone.View.extend(Circle);
	
});