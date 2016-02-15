'use strict';
var Backbone = require('backbone');

// header.js
module.exports = Backbone.View.extend({

	el: $("#header"),
	initialize: function() {

		var $navbar = $(".navbar-fixed-top");
		$(window).scroll(function() {
			if ($(".navbar").offset().top > 50) {
				// $body.addClass('show-list');
				$navbar.addClass("top-nav-collapse");
			} else {
				// $body.removeClass('show-list');
				// $body.removeClass('show-video');
				$navbar.removeClass("top-nav-collapse");
			}
		});
	},
	events: {
		// "click .nav.navbar-nav a": 'menuClick'
	},

	menuClick: function() {
		alert('clicked');
	},

	render: function() {
		this.setElement($("#header"));

		// if (App.currentUser.isSignedIn()) {
		// 	console.log('header.js | Rendering for signed in user');

		// 	this.$('.header_is_not_signed_in').hide();
		// 	this.$('.header_is_signed_in').show();
		// } else {
		// 	console.log('header.js | Rendering for not signed in user');
		// 	this.$('.header_is_not_signed_in').show();
		// 	this.$('.header_is_signed_in').hide();
		// }


		// $(".menu_category").parent().removeClass('active');
		// if (typeof(App.page) !== 'undefined' && App.page && typeof(App.page.category) !== 'undefined') {
		// 	$(".menu_category_" + App.page.category).parent().addClass('active');
		// } else {
		// 	$(".menu_category_home").parent().addClass('active');
		// }


		/*console.log('header.js | Header rendered');*/
		return this;
	}
});