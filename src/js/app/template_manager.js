'use strict';

var settings = require('./settings');
var localStorage = require('./local_storage');

// template_manager.js
var templateManager = {
    _cache: {},
    _templates: {},
    _loadingStates: {},
    _loadingCallbacks: {},
    _initialized: false,
    initialize: function () {

        // jSmart.prototype.getTemplate = function(name) {
        // 	if (name.indexOf('shared/widgets/') === 0) {
        // 		/// It's a widget!
        // 		var widgetName = name.split('shared/widgets/').join('').split('.tpl').join('');
        // 		console.log('template_manager.js | Including widget "' + widgetName + '"');

        // 		return '<div class="widget client-side-widget client-side-widget-' + widgetName + '" id="widget_' + (Math.random() + '').split('0.').join('') + '" data-widget-name="' + widgetName + '"></div>';
        // 	}

        // 	if (typeof(App.templateManager._templates[name]) !== 'undefined') {
        // 		return App.templateManager._cache[name];
        // 	} else {
        // 		throw new Error('Template ' + name + ' is not yet loaded');
        // 	}
        // };
        _.template.formatdate = function (stamp) {

            var d = new Date(stamp); // or d = new Date(date*1000)

            if (Object.prototype.toString.call(d) === "[object Date]") {
                if (!isNaN(d.getTime())) {  // d.valueOf() could also work
                    // date is not valid
                    var date = [
                        d.getDate(),
                        d.getMonth() + 1,
                        d.getFullYear()
                    ], time = [
                        d.getHours(),
                        d.getMinutes(),
                    ];
                    return date.join('/') + ' ' + time.join(':');
                }
            }
            return 'n/v';
        };


        this._initialized = true;
    },
    commonData: function () {
        return {
            settings: _.extend(settings, {
                site_path: settings.sitePath,
                client_side: true,
                invite_mode: settings.inviteMode
            })
        };
    },
    fetch: function (name, data, success) {
        if (!this._initialized)
            this.initialize();

        data = _.extend(data, this.commonData());

        if (typeof (this._templates[name]) !== 'undefined' || this.tryToLoadFromStorage(name)) {
            var res = this._templates[name](data);
            if (typeof (success) === 'function')
                success(res);
            return res;
        }

        var that = this;
        if (typeof (success) === 'function') {
            if (typeof (this._loadingStates[name]) !== 'undefined' && this._loadingStates[name] === 'loading') {
                // already fetched
                if (typeof (this._loadingCallbacks[name]) === 'undefined') {
                    this._loadingCallbacks[name] = [];
                }

                this._loadingCallbacks[name].push(function (tpl) {
                    success(tpl(data));
                });

            } else {
                // fetch template
                this.loadFromServer(name, function (tpl) {
                    // console.log('tpl',tpl);

                    success(tpl(data));
                    // success(tpl.fetch(data));
                });
            }

        } else {
            this.loadFromServer(name);
        }

        return false;
    },
    tryToLoadFromStorage: function (name) {
        if (!settings.enableTemplatesCache) {
            console.log('%cTemplates cache is disabled', 'color: red');
            return false;
        }

        if (!localStorage.isSupported()) {
            console.log('Local storage is disabled', 'color: red');
            return false;
        }

        var data = localStorage.get('app_templates_' + name);
        if (data) {
            this._cache[name] = data;
            this._templates[name] = _.template(data);
            this._loadingStates[name] = 'ready';

            return true;
        }

        return false;
    },
    loadFromServer: function (name, callback) {

        this._loadingStates[name] = 'loading';
        var that = this;
        var templateName = name;
        var callbackFunc = callback;

        console.time("template_manager.js | Fetch " + templateName + " from server");

        var process = function (data) {
            console.timeEnd("template_manager.js | Fetch " + templateName + " from server");
            console.group("Template name: " + templateName);
            console.log("Callback function present: " + typeof (callbackFunc));
            if (typeof (that._loadingCallbacks[templateName]) === 'undefined')
                console.log("No additional callbacks");
            else
                console.log("Additional callbacks: " + that._loadingCallbacks[templateName].length);
            console.groupEnd();

            if (data) {
                localStorage.set('app_templates_' + templateName, data);
                that._cache[templateName] = data;
                // that._templates[templateName] = new jSmart(data);
                that._templates[templateName] = _.template(data);
                that._loadingStates[templateName] = 'ready';

                if (typeof (callbackFunc) === 'function')
                    callbackFunc(that._templates[templateName]);

                if (typeof (that._loadingCallbacks[templateName]) !== 'undefined') {
                    for (var k in that._loadingCallbacks[templateName])
                        that._loadingCallbacks[templateName][k](that._templates[templateName]);

                    that._loadingCallbacks[templateName] = [];
                }
            }
        };

        var use_cache = true;
        if (!settings.enableTemplatesCache)
            use_cache = false;

        $.ajax({
            url: settings.templatePath + name,
            data: {},
            success: process,
            dataType: 'html',
            mimeType: 'text/plain',
            cache: use_cache
        });
    }


};

module.exports = templateManager;