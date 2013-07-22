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
	
	var $ = require('jquery'),
		_ = require('underscore'),
		Circle = require('views/Circle');


	// Main window click event (HammerJS)
	$('.wrap').on('click', function(e) {
		e.preventDefault();

		// check and make sure you're not clicking on an existing circle
		if(!$(e.target).hasClass('circle')) {
			var circle = new Circle({x: e.pageX, y: e.pageY, size: 200});
			$('.wrap').append(circle.$el);
		}
	});
});



// Start the application
require(['main']);