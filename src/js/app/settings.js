'use strict';

var debug = (typeof (app_debug) !== 'undefined' && app_debug) ? true : false;

if (debug) {
    //site_path = //example.com
    var config = {
        rootPath: '/fame/fametv/web/app_dev.php',
        apiEntryPoint: site_path + '/fame/fametv/web/app_dev.php/api/',
        templatePath: site_path + '/fame/fametv/web/bundles/app/front-end/src/js/app/tpls/',
    };
} else {

    var config = {
        rootPath: '/',
        apiEntryPoint: site_path + '/api/',
        templatePath: site_path + '/bundles/app/front-end/src/js/app/tpls/',
    };

}
var paths = {
    rootPath: config.rootPath,
    apiEntryPoint: config.apiEntryPoint,
    templatePath: config.templatePath,
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
    debug: debug,
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