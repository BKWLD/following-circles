// Set the require.js configuration for the application
require.config({
	
	baseUrl: 'js/',
	
	// Set common library paths
	paths: {
		jquery: 'empty:',
		underscore: 'libs/underscore',
		backbone: 'libs/backbone'
	}
});

// Define the application entry point
define('main', function (require) {
	
	// Dependencies
	var $ = require('jquery'),
		_ = require('underscore'),
		Circle = require('views/Circle');

	// Main window click event
	$('.wrap').on('click', function(e) {

		// Check and make sure you're not clicking on an existing circle
		if($(e.target).hasClass('circle')) return;
	
		// Create a circle		
		var circle = new Circle({x: e.pageX, y: e.pageY});
		$('.wrap').append(circle.el);
	});
});



// Start the application
require(['main']);