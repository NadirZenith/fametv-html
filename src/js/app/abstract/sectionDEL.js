'use strict';

// var App = require('./../../app');
var templateManager = require('./../template_manager');
var settings = require('./../settings');
var log = require('./../log');
var viewStack = require('./../view_stack');
var AbstractPage = require('./page');


// sectionPage.js
var SectionPage = AbstractPage.extend({

	isReady: false,
	requiresSignedIn: false,
	widgets: [],
	parts: [],
	partsInitialized: false,
	renderHTML: function(data) {

		if (typeof(this.templateName) === 'undefined' || !this.templateName)
			throw 'templateName is undefined';

		if (typeof(data) === 'undefined')
			data = {};

		this.switchBuffers();

		var that = this;
		templateManager.fetch(this.templateName, data, function(html) {
			that.$el.html('<div class="page">' + html + '</div>');
			// $('.page', "#page_holder_" + App.currentHolder).removeClass('page_loading');
			that.proccessWidgets();
			that.trigger('render');
			that.trigger('loaded');

			var App = require('./../../app');
			App.setProgress(true);
		});
		this.setTitle();
		this.setURL();
		this.isReady = true;

		return this;
	},


});

module.exports = SectionPage;