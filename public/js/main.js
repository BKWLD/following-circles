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
	$('.wrap').on('click', function(e) {
		e.preventDefault();

		// make it so you can only create 20 circles
		// also, check and make sure you're not clicking on an existing circle
		if(count < cap && !$(e.target).hasClass('circle')) {
			var circle = new Circle({x: e.pageX, y: e.pageY, size: 200});
			$('.wrap').append(circle.$el);
			count++;
		}
	});
});



// Start the application
require(['main']);