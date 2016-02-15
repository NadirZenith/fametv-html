'use strict';

//site_path = //example.com
var paths_dev = {
    // sitePath = http://example.com (:80)
    sitePath: window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port : ''),
    // rootPath = /web/app_dev.php
    rootPath: '/fametv-html/index.php',
    // apiEntryPoint = rootPath + '/api/
    apiEntryPoint: site_path + '/fametv-html/api/',
    // templatePath = rootPath + '/js/tpls/
    templatePath: site_path + '/fametv-html/src/js/app/tpls/',
};
//site_path = //example.com
var paths_dev2 = {
    // sitePath = http://example.com (:80)
    sitePath: window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port : ''),
    // rootPath = /web/app_dev.php
    rootPath: '/fametv-html/index.php',
    // apiEntryPoint = rootPath + '/api/
    apiEntryPoint: site_path + '/fame/fametv/web/app_dev.php/api/',
    // templatePath = rootPath + '/js/tpls/
    templatePath: site_path + '/fametv-html/src/js/app/tpls/',
};
//site_path = //example.com
var paths = {
    // sitePath = http://example.com (:80)
    sitePath: window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port : ''),
    // rootPath = /web/app_dev.php
    rootPath: '/fame/fametv/web/app_dev.php',
    // apiEntryPoint = rootPath + '/api/
    apiEntryPoint: site_path + '/fame/fametv/web/app_dev.php/api/',
    // templatePath = rootPath + '/js/tpls/
    templatePath: site_path + '/fametv-html/src/js/app/tpls/',
};
// settings.js
var settings = {
    //site_path = //example.com
    // sitePath = http://example.com (:80)
    sitePath: window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port : ''),
    // rootPath = /web/app_dev.php
    rootPath: paths.rootPath,
    // apiEntryPoint = rootPath + '/api/
    apiEntryPoint: paths.apiEntryPoint,
    // templatePath = rootPath + '/js/tpls/
    templatePath: paths.templatePath,
    //
    version: (typeof (app_version) !== 'undefined') ? app_version : '',
    debug: true,
    title: function (title) {
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
    detectLanguage: function () {

        var language = 'default';
        if (App.localStorage.get('selected_interface_locale'))
            language = App.localStorage.get('selected_interface_locale');
        else {
            language = window.navigator.userLanguage || window.navigator.language;
            if (language && typeof (this.availiableLocales[language]) == 'undefined' && language.indexOf('-') != -1) {
                language = language.split('-')[0];
            }
        }

        if (typeof (this.availiableLocales[language]) == 'undefined')
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
console.log(site_path);
console.log(settings);


var defaultConsole = {
    log: function () {
    },
    error: function () {
    },
    time: function () {
    },
    timeEnd: function () {
    },
    group: function () {
    },
    groupEnd: function () {
    },
};

window.debug = function (bool) {
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