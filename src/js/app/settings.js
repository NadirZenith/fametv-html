'use strict';

// settings.js
var settings = {

	sitePath: window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port : ''), //nz.lab
	rootPath: '/fametv-html/index.php',
	apiEntryPoint: site_path + '/fametv-html' + '/api/',
	templatePath: site_path + '/fametv-html/src/js/app/tpls/',
	version: (typeof(app_version) !== 'undefined') ? app_version : '',
	debug: true,
	title: function(title) {
		return title + ' | ' + 'FameTV';
	},

	availiableLocales: {
		'default': {
			code: 'en',
			name: 'English',
			timeFormat: '12',
			dateFormat: 'mdy'
		},

		'pt': {
			name: 'Português',
			timeFormat: '24',
			dateFormat: 'dmy'
		}
	},
	detectLanguage: function() {

		var language = 'default';
		if (App.localStorage.get('selected_interface_locale'))
			language = App.localStorage.get('selected_interface_locale');
		else {
			language = window.navigator.userLanguage || window.navigator.language;
			if (language && typeof(this.availiableLocales[language]) == 'undefined' && language.indexOf('-') != -1) {
				language = language.split('-')[0];
			}
		}

		if (typeof(this.availiableLocales[language]) == 'undefined')
			language = 'default';

		this.timeFormat = this.availiableLocales[language][0];
		this.dateFormat = this.availiableLocales[language][1];
		this.language = language;

		return language;
	},
	language: 'pt',
	timeFormat: '24', // 12 or 24
	dateFormat: 'dmy', // mdy or dmy

	allowRealTimeTranslation: true,

	enableTemplatesCache: false,
	enablePagesStack: true,
	pagesStackMaxLength: 25,

	history: {
		pushState: true,
		startSilent: false
	},

	inviteMode: true,


	site_path: site_path,
	invite_mode: this.inviteMode,
	client_side: true,

};


var defaultConsole = {
	log: function() {},
	error: function() {},
	time: function() {},
	timeEnd: function() {},
	group: function() {},
	groupEnd: function() {},
};

window.debug = function(bool) {
	if (window.console) {
		var consoleHolder = console;

		if (!bool) {
			window.console = defaultConsole;

			return '- debug disabled -';
		} else {
			window.console = consoleHolder;
			return '- debug enabled -';
		}
	} else {
		window.console = defaultConsole;
		if (bool) {
			alert('no console available');
		}
	}
}
window.debug(settings.debug);


module.exports = settings;