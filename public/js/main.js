// Set the require.js configuration for the application
require.config({
	
	baseUrl: '/js/',
	
	// Set common library paths
	paths: {
		jquery: 'empty:',
		underscore: 'libs/underscore',
		backbone: 'libs/backbone'
	}
});

// Define the application entry point
define('main', function (require) {
	
	var $ = require('jquery'),
		_ = require('underscore'),
		app = require('modules/app'),
		Circle = require('views/Circle');

	var cap = 20,
		count = 0;

	// Main window click event (HammerJS)
	$(window).on('click', function(e) {
		e.preventDefault();

		// make it so you can only create 20 circles
		if(count < cap) {
			var circle = new Circle(e);
			$('.wrap').append(circle.$el);
			count++;
		}
		
	});
});



// Start the application
require(['main']);