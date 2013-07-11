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
		Circle = require('modules/view/Circle.js');

		//create a circle view (test)
		var circle = new Circle({el: })

});

// Start the application
require(['main']);