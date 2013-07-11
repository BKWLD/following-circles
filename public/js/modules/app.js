// --------------------------------------------------
// Main app init and events
// --------------------------------------------------
define(function (require) {
	
	// dependencies
	var $         = require('jquery')
		, _         = require('underscore')
		, Backbone  = require('backbone')
		, Modernizr = window.Modernizr
	;
	
	// private static vars
	var app = _.extend({}, Backbone.Events)
		, $win    = $(window)
		, $body   = $('body')
		, $doc    = $(document)
	;

	// --------------------------------------------------
	// Pre-ready init
	
	// disable # links because they're not links silly
	$doc.on('click', '[href="#"]', false);

	// --------------------------------------------------
	// Event triggers
	
	// app-wide window resize
	$win.on('orientationchange resize load', resize);
	var lazyResize = _.debounce(function () {
		app.trigger('lazyResize');
	}, 100);
	function resize() {
		app.width = $win.width();
		app.height = $win.height();
		app.trigger('resize');
		lazyResize();
	}
	resize();
	
	// wrap the scroll event
	$win.on('scroll', function (evt) {
		app.trigger('scroll', evt, $win.scrollTop());
	});
	
	// document level mouseup
	$doc.on('touchend mouseup mouseleave', function (evt) {
		app.trigger('mouseup', evt);
	});
	
	// return public module
	return app;
});