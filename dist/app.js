'use strict';

var settings = require('./app/settings');
var viewStack = require('./app/view_stack');
// var LayoutManager = require('backbone.layoutmanager');
// console.log(settings);
/*var Router = require('./app/router');*/



module.exports = {
    Models: {},
    Collections: {},
    Views: {
        // Abstract: {},
        // Dialogs: {},
        Pages: {
            Index: require('./app/view/pages/index'),
            Page: require('./app/view/pages/page')
        },
        // Widgets: {},
        Parts: {
            Header: require('./app/view/header')
        },
        // Charts: {}
    },
    /*router: require('./app/router'),*/
    // Tours: {},
    // currentTour: null,
    // //router: null,
    // dialog: null,
    page: null,
    header: null,
    // footer: null,
    // settings: null,
    // currentUser: null,
    init: function () {
        var that = this;
        $.ajaxSetup({
            cache: false
        });

        var doneCallback = function () {
            var router = require('./app/router');

            router.init();
            that.loadingStatus(false);
        };
        doneCallback();

    },
    showPage: function (pageName, params) {
        if (typeof (this.Views.Pages[pageName]) === 'undefined') {
            console.error("There is no view class defined");
            return false;
        }

        this.renderLayoutBlocks();

        console.group('%c- Showing page: %s -', 'background: #222; color: #bada55', pageName);
        // if (App.currentTour)
        // App.currentTour.finish();

        if (typeof (params) === 'undefined')
            params = {};

        var _hash = true;
        if (typeof (params.hash) !== 'undefined' && !params.hash) {
            _hash = false;
        }

        /// Trying to get view from stack
        var fromStack = viewStack.getView(pageName, params, _hash);

        // if same view just update
        if (typeof (this.page) !== 'undefined' && fromStack) {
            if (this.page.cid === fromStack.cid) {
                console.log('Updating current view %s', pageName);
                console.groupEnd();

                this.page.update(params);
                return true;
            }
        }

        // undelegate events from previous page
        if (typeof (this.page) !== 'undefined' && this.page) {
            console.log('sleep app.js', this.page.parts);
            this.page.sleep();
        }

        if (fromStack !== false) {
            /// Console log wake up page from stack
            console.log('Showing page from stack');
            
            this.page = fromStack;
            this.page.wakeUp();
            this.loadingStatus(false);

        } else {
            /// or create new one
            console.log('Creating new page');

            this.loadingStatus(true);
            this.page = new this.Views.Pages[pageName](params);
            this.page.on('loaded', function () {
                this.loadingStatus(false);
            }, this);

            if (this.page.isReady)
                this.loadingStatus(false);

            viewStack.addView(pageName, params, this.page, _hash);
        }
        console.groupEnd();

        return true;
    },
    setProgress: function (value) {
        if (!this.progress)
            this.progress = new Mprogress();

        if (typeof (value) === 'undefined') {
            if (this.progress.status === null)
                return this.progress.start();
            else
                return this.progress.inc();
        }
        if (value >= 1 || value === true)
            return this.progress.end();

        this.progress.set(value);
    },
    loadingStatus: function (status) {
        if (status) {
            console.log('app.js | Loading status = true');
            this.isLoading = true;
            // $('html').animate({
            //     opacity: 0
            // }, 1000);
            $('#preloader').stop().show();
        } else {
            console.log('app.js | Loading status = false');
            this.isLoading = false;
            $('html').animate({
                opacity: 1
            }, 1000);
            $('#preloader').stop().fadeOut('slow');
        }
    },
    renderLayoutBlocks: function () {

        if (this.header) {
            return;
        }

        var header = require('./app/view/header');
        this.header = new header();

        var that = this;
        var renderFunc = function () {
            that.header.render();
        };

        if ($.isReady) {
            renderFunc();
        } else {
            $(function () {
                renderFunc();
            });
        }
    },
};
/*
 *  Prototype working slide down 
 */
$(function () {
    //fade initial page show
    $('html').animate({
        opacity: 1
    }, 1000);

    //jQuery to collapse the navbar on scroll
    /*    
     $(window).scroll(function () {
     if ($(".navbar").offset().top > 50) {
     $(".navbar-fixed-top").addClass("top-nav-collapse");
     } else {
     $(".navbar-fixed-top").removeClass("top-nav-collapse");
     }
     });
     * */
    //jQuery for page scrolling feature - requires jQuery Easing plugin
    $(function () {
        $('a.page-scroll').bind('click', function (event) {
            var $anchor = $(this);
            $('html, body').stop().animate({
                scrollTop: $($anchor.attr('href')).offset().top
            }, 1500, 'easeInOutExpo');
            event.preventDefault();
        });
    });


    var winSize = '';
    window.onresize = onWindowResize;
    function onWindowResize() {
        var windowWidth = $(this).width();
        var newWinSize = 'xs'; // default value, check for actual size
        if (windowWidth >= 1200) {
            newWinSize = 'lg';
        } else if (windowWidth >= 992) {
            newWinSize = 'md';
        } else if (windowWidth >= 768) {
            newWinSize = 'sm';
        }
        if (newWinSize !== winSize) {
            winSize = newWinSize;
        }
    }
    onWindowResize();

    //hide navbar on menu click(only on mobiles| xs)
    $('.nav a').on('click', function () {
        if (winSize === 'xs') {
            $('.navbar-toggle').click();
        }
    });

    /*
     var waypoint = new Waypoint({
     element: document.getElementById('home'),
     offset: '-50px',
     handler: function (direction) {
     console.log('works', direction);
     var $body = $('body');
     var $navbar = $(".navbar-fixed-top");
     if ('down' === direction) {
     $body.addClass('show-list');
     $navbar.addClass("top-nav-collapse");
     
     } else {
     $body.removeClass('show-list');
     $body.removeClass('show-video');
     $navbar.removeClass("top-nav-collapse");
     }
     }
     });
     */
    var $body = $('body');
    var $navbar = $(".navbar-fixed-top");
    $(window).scroll(function () {
        if ($(".navbar").offset().top > 50) {
            $body.addClass('show-list');
            $navbar.addClass("top-nav-collapse");
        } else {
            $body.removeClass('show-list');
            $body.removeClass('show-video');
            $navbar.removeClass("top-nav-collapse");
        }
    });

    var doc = document.documentElement;
    var top = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);

    $('#list').on('click', '.video-list-item', function (e) {
        e.preventDefault();
        $body.addClass('show-video');
        top = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
    });

    $(window).on('scroll', function () {
        var newTop = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
        console.log('Event Fired', top, newTop);
        if (newTop !== top) {
            $body.removeClass('show-video');
        }
    });

});
/*
 *  Implermenting backbone
 */
$(function () {
    App.init();
});

window.App = {
    Models: {},
    Collections: {},
    Views: {
        Abstract: {},
        Dialogs: {},
        Pages: {},
        Widgets: {},
        Parts: {},
        Charts: {}
    },
    Tours: {},
    currentTour: null,
    router: null,
    dialog: null,
    page: null,
    header: null,
    footer: null,
    settings: null,
    currentUser: null,
    init: function () {
        var that = this;
        $.ajaxSetup({
            cache: false
        });

        var doneCallback = function () {
            alert('done callback');
            return;
            that.localStorage.invalidate(that.settings.version);
            that.i18n.setLanguage(that.settings.detectLanguage());
            that.router.init();
            that.loadingStatus(false);
        };

        if (document.cookie.indexOf("is_logged_in_user") >= 0) {
            $.get(this.settings.apiEntryPoint + 'users', function (user) {
                if (user)
                    that.setUser(user);
                else
                    that.setUser();
            }, 'json')
                    .fail(function () {
                        that.setUser();
                    }).always(function () {
                doneCallback();
            });
        } else {
            that.setUser();
            doneCallback();
        }
    },
    showDialog: function (dialogName, params) {
        if (typeof (App.Views.Dialogs[dialogName]) === 'undefined') /// this page is already current
            return false;

        if (App.dialog && App.dialog.isVisible) {
            App.dialog.once('hidden', function () {
                console.log('Ready to show another dialog');
                App.dialog = new App.Views.Dialogs[dialogName](params);
            }, this);
            App.dialog.hide();
        } else {
            App.dialog = new App.Views.Dialogs[dialogName](params);
            App.log.event('dialog', 'Show Dialog ' + dialogName);
        }

        return true;
    },
    showPage: function (pageName, params) {

        console.log('Showing page: ' + pageName);

        if (App.currentTour)
            App.currentTour.finish();

        if (typeof (params) === 'undefined')
            params = {};

        if (typeof (App.Views.Pages[pageName]) === 'undefined') {
            console.error("There is no view class defined");
            return false;
        }

        if (typeof (this.page) !== 'undefined' && this.page) /// undelegate events from previous page
        {
            this.page.sleep();
        }

        /// Trying to get view from stack
        var fromStack = this.viewStack.getView(pageName, params);


        if (fromStack !== false) {
            /// Console log wake up page from stack
            console.log('Showing page from stack');
            this.page = fromStack;
            this.page.wakeUp();
            this.loadingStatus(false);

        } else {
            /// or create new one
            this.loadingStatus(true);
            this.page = new App.Views.Pages[pageName](params);
            this.page.on('loaded', function () {
                this.loadingStatus(false);
            }, this);
            if (this.page.isReady)
                this.loadingStatus(false);
            // this.listenTo(this.page, 'loaded', function(){ this.loadingStatus(false); });
            // this.listenTo(this.page, 'loading', function(){ this.loadingStatus(true); });

            this.viewStack.addView(pageName, params, this.page);
        }
        this.renderLayoutBlocks();

        return true;
    },
    setProgress: function (value) {
        if (!this.progress)
            this.progress = new Mprogress();

        if (typeof (value) === 'undefined') {
            if (this.progress.status === null)
                return this.progress.start();
            else
                return this.progress.inc();
        }
        if (value >= 1 || value === true)
            return this.progress.end();
        this.progress.set(value);
    },
    loadingStatus: function (status) {
        if (status) {
            console.log('app.js | Loading status = true');
            this.isLoading = true;
            $('#preloader').stop().show();
        } else {
            console.log('app.js | Loading status = false');
            this.isLoading = false;
            $('#preloader').stop().fadeOut('slow');
        }
    },
    setUser: function (data) {
        this.currentUser = new App.Models.User();
        this.currentUser.on('signedInStatusChanged', this.userChanged, this);
        if (typeof (data) !== 'undefined')
            this.currentUser.signInWithData(data);
    },
    userChanged: function () {
        console.log('User info changed');
        // You can also refresh the page here if you want to.

        this.renderLayoutBlocks();
    },
    renderLayoutBlocks: function () {
        var that = this;

        if (!this.header) {
            this.header = new App.Views.Header();
        }

        var renderFunc = function () {
            that.header.render();
        };

        if ($.isReady) {
            renderFunc();
        } else {
            $(function () {
                renderFunc();
            });
        }
    },
    createCookie: function (name, value, days) {
        var expires;

        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toGMTString();
        } else {
            expires = "";
        }
        document.cookie = encodeURIComponent(name) + "=" + encodeURIComponent(value) + expires + "; path=/";
    },
    readCookie: function (name) {
        var nameEQ = encodeURIComponent(name) + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) === ' ')
                c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0)
                return decodeURIComponent(c.substring(nameEQ.length, c.length));
        }
        return null;
    },
    eraseCookie: function (name) {
        App.createCookie(name, "", -1);
    }

};


/*debug*/
function includeCssDebug(e) {
    var evtobj = window.event ? event : e
    if (evtobj.keyCode == 90 && evtobj.ctrlKey) {

        var cssId = 'debug-bootstrap';  // you could encode the css path itself to generate id..
        if (!document.getElementById(cssId))
        {
            var head = document.getElementsByTagName('head')[0];
            var link = document.createElement('link');
            link.id = cssId;
            link.rel = 'stylesheet';
            link.type = 'text/css';
            link.href = 'src/css/bootstrap-responsive-debug.css';
            link.media = 'all';
            head.appendChild(link);
        }

    }
}

document.onkeydown = includeCssDebug;

'use strict';

var App = require('./app');

/*
 *  Implermenting backbone
 */
$(function () {
    App.init();
});

/*debug*/
function includeCssDebug(e) {
    var evtobj = window.event ? event : e
    if (evtobj.keyCode == 90 && evtobj.ctrlKey) {

        var cssId = 'debug-bootstrap';  // you could encode the css path itself to generate id..
        if (!document.getElementById(cssId))
        {
            var head = document.getElementsByTagName('head')[0];
            var link = document.createElement('link');
            link.id = cssId;
            link.rel = 'stylesheet';
            link.type = 'text/css';
            link.href = 'src/css/bootstrap-responsive-debug.css';
            link.media = 'all';
            head.appendChild(link);
        }

    }
}

document.onkeydown = includeCssDebug;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsIm1haW4uYmFrLmpzIiwibWFpbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDNUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3JWQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbnZhciBzZXR0aW5ncyA9IHJlcXVpcmUoJy4vYXBwL3NldHRpbmdzJyk7XG52YXIgdmlld1N0YWNrID0gcmVxdWlyZSgnLi9hcHAvdmlld19zdGFjaycpO1xuLy8gdmFyIExheW91dE1hbmFnZXIgPSByZXF1aXJlKCdiYWNrYm9uZS5sYXlvdXRtYW5hZ2VyJyk7XG4vLyBjb25zb2xlLmxvZyhzZXR0aW5ncyk7XG4vKnZhciBSb3V0ZXIgPSByZXF1aXJlKCcuL2FwcC9yb3V0ZXInKTsqL1xuXG5cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgTW9kZWxzOiB7fSxcbiAgICBDb2xsZWN0aW9uczoge30sXG4gICAgVmlld3M6IHtcbiAgICAgICAgLy8gQWJzdHJhY3Q6IHt9LFxuICAgICAgICAvLyBEaWFsb2dzOiB7fSxcbiAgICAgICAgUGFnZXM6IHtcbiAgICAgICAgICAgIEluZGV4OiByZXF1aXJlKCcuL2FwcC92aWV3L3BhZ2VzL2luZGV4JyksXG4gICAgICAgICAgICBQYWdlOiByZXF1aXJlKCcuL2FwcC92aWV3L3BhZ2VzL3BhZ2UnKVxuICAgICAgICB9LFxuICAgICAgICAvLyBXaWRnZXRzOiB7fSxcbiAgICAgICAgUGFydHM6IHtcbiAgICAgICAgICAgIEhlYWRlcjogcmVxdWlyZSgnLi9hcHAvdmlldy9oZWFkZXInKVxuICAgICAgICB9LFxuICAgICAgICAvLyBDaGFydHM6IHt9XG4gICAgfSxcbiAgICAvKnJvdXRlcjogcmVxdWlyZSgnLi9hcHAvcm91dGVyJyksKi9cbiAgICAvLyBUb3Vyczoge30sXG4gICAgLy8gY3VycmVudFRvdXI6IG51bGwsXG4gICAgLy8gLy9yb3V0ZXI6IG51bGwsXG4gICAgLy8gZGlhbG9nOiBudWxsLFxuICAgIHBhZ2U6IG51bGwsXG4gICAgaGVhZGVyOiBudWxsLFxuICAgIC8vIGZvb3RlcjogbnVsbCxcbiAgICAvLyBzZXR0aW5nczogbnVsbCxcbiAgICAvLyBjdXJyZW50VXNlcjogbnVsbCxcbiAgICBpbml0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICAgICAgJC5hamF4U2V0dXAoe1xuICAgICAgICAgICAgY2FjaGU6IGZhbHNlXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHZhciBkb25lQ2FsbGJhY2sgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgcm91dGVyID0gcmVxdWlyZSgnLi9hcHAvcm91dGVyJyk7XG5cbiAgICAgICAgICAgIHJvdXRlci5pbml0KCk7XG4gICAgICAgICAgICB0aGF0LmxvYWRpbmdTdGF0dXMoZmFsc2UpO1xuICAgICAgICB9O1xuICAgICAgICBkb25lQ2FsbGJhY2soKTtcblxuICAgIH0sXG4gICAgc2hvd1BhZ2U6IGZ1bmN0aW9uIChwYWdlTmFtZSwgcGFyYW1zKSB7XG4gICAgICAgIGlmICh0eXBlb2YgKHRoaXMuVmlld3MuUGFnZXNbcGFnZU5hbWVdKSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJUaGVyZSBpcyBubyB2aWV3IGNsYXNzIGRlZmluZWRcIik7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnJlbmRlckxheW91dEJsb2NrcygpO1xuXG4gICAgICAgIGNvbnNvbGUuZ3JvdXAoJyVjLSBTaG93aW5nIHBhZ2U6ICVzIC0nLCAnYmFja2dyb3VuZDogIzIyMjsgY29sb3I6ICNiYWRhNTUnLCBwYWdlTmFtZSk7XG4gICAgICAgIC8vIGlmIChBcHAuY3VycmVudFRvdXIpXG4gICAgICAgIC8vIEFwcC5jdXJyZW50VG91ci5maW5pc2goKTtcblxuICAgICAgICBpZiAodHlwZW9mIChwYXJhbXMpID09PSAndW5kZWZpbmVkJylcbiAgICAgICAgICAgIHBhcmFtcyA9IHt9O1xuXG4gICAgICAgIHZhciBfaGFzaCA9IHRydWU7XG4gICAgICAgIGlmICh0eXBlb2YgKHBhcmFtcy5oYXNoKSAhPT0gJ3VuZGVmaW5lZCcgJiYgIXBhcmFtcy5oYXNoKSB7XG4gICAgICAgICAgICBfaGFzaCA9IGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8vIFRyeWluZyB0byBnZXQgdmlldyBmcm9tIHN0YWNrXG4gICAgICAgIHZhciBmcm9tU3RhY2sgPSB2aWV3U3RhY2suZ2V0VmlldyhwYWdlTmFtZSwgcGFyYW1zLCBfaGFzaCk7XG5cbiAgICAgICAgLy8gaWYgc2FtZSB2aWV3IGp1c3QgdXBkYXRlXG4gICAgICAgIGlmICh0eXBlb2YgKHRoaXMucGFnZSkgIT09ICd1bmRlZmluZWQnICYmIGZyb21TdGFjaykge1xuICAgICAgICAgICAgaWYgKHRoaXMucGFnZS5jaWQgPT09IGZyb21TdGFjay5jaWQpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnVXBkYXRpbmcgY3VycmVudCB2aWV3ICVzJywgcGFnZU5hbWUpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZ3JvdXBFbmQoKTtcblxuICAgICAgICAgICAgICAgIHRoaXMucGFnZS51cGRhdGUocGFyYW1zKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHVuZGVsZWdhdGUgZXZlbnRzIGZyb20gcHJldmlvdXMgcGFnZVxuICAgICAgICBpZiAodHlwZW9mICh0aGlzLnBhZ2UpICE9PSAndW5kZWZpbmVkJyAmJiB0aGlzLnBhZ2UpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdzbGVlcCBhcHAuanMnLCB0aGlzLnBhZ2UucGFydHMpO1xuICAgICAgICAgICAgdGhpcy5wYWdlLnNsZWVwKCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZnJvbVN0YWNrICE9PSBmYWxzZSkge1xuICAgICAgICAgICAgLy8vIENvbnNvbGUgbG9nIHdha2UgdXAgcGFnZSBmcm9tIHN0YWNrXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnU2hvd2luZyBwYWdlIGZyb20gc3RhY2snKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgdGhpcy5wYWdlID0gZnJvbVN0YWNrO1xuICAgICAgICAgICAgdGhpcy5wYWdlLndha2VVcCgpO1xuICAgICAgICAgICAgdGhpcy5sb2FkaW5nU3RhdHVzKGZhbHNlKTtcblxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8vIG9yIGNyZWF0ZSBuZXcgb25lXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnQ3JlYXRpbmcgbmV3IHBhZ2UnKTtcblxuICAgICAgICAgICAgdGhpcy5sb2FkaW5nU3RhdHVzKHRydWUpO1xuICAgICAgICAgICAgdGhpcy5wYWdlID0gbmV3IHRoaXMuVmlld3MuUGFnZXNbcGFnZU5hbWVdKHBhcmFtcyk7XG4gICAgICAgICAgICB0aGlzLnBhZ2Uub24oJ2xvYWRlZCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmxvYWRpbmdTdGF0dXMoZmFsc2UpO1xuICAgICAgICAgICAgfSwgdGhpcyk7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLnBhZ2UuaXNSZWFkeSlcbiAgICAgICAgICAgICAgICB0aGlzLmxvYWRpbmdTdGF0dXMoZmFsc2UpO1xuXG4gICAgICAgICAgICB2aWV3U3RhY2suYWRkVmlldyhwYWdlTmFtZSwgcGFyYW1zLCB0aGlzLnBhZ2UsIF9oYXNoKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zb2xlLmdyb3VwRW5kKCk7XG5cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSxcbiAgICBzZXRQcm9ncmVzczogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIGlmICghdGhpcy5wcm9ncmVzcylcbiAgICAgICAgICAgIHRoaXMucHJvZ3Jlc3MgPSBuZXcgTXByb2dyZXNzKCk7XG5cbiAgICAgICAgaWYgKHR5cGVvZiAodmFsdWUpID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgaWYgKHRoaXMucHJvZ3Jlc3Muc3RhdHVzID09PSBudWxsKVxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnByb2dyZXNzLnN0YXJ0KCk7XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucHJvZ3Jlc3MuaW5jKCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHZhbHVlID49IDEgfHwgdmFsdWUgPT09IHRydWUpXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wcm9ncmVzcy5lbmQoKTtcblxuICAgICAgICB0aGlzLnByb2dyZXNzLnNldCh2YWx1ZSk7XG4gICAgfSxcbiAgICBsb2FkaW5nU3RhdHVzOiBmdW5jdGlvbiAoc3RhdHVzKSB7XG4gICAgICAgIGlmIChzdGF0dXMpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdhcHAuanMgfCBMb2FkaW5nIHN0YXR1cyA9IHRydWUnKTtcbiAgICAgICAgICAgIHRoaXMuaXNMb2FkaW5nID0gdHJ1ZTtcbiAgICAgICAgICAgIC8vICQoJ2h0bWwnKS5hbmltYXRlKHtcbiAgICAgICAgICAgIC8vICAgICBvcGFjaXR5OiAwXG4gICAgICAgICAgICAvLyB9LCAxMDAwKTtcbiAgICAgICAgICAgICQoJyNwcmVsb2FkZXInKS5zdG9wKCkuc2hvdygpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ2FwcC5qcyB8IExvYWRpbmcgc3RhdHVzID0gZmFsc2UnKTtcbiAgICAgICAgICAgIHRoaXMuaXNMb2FkaW5nID0gZmFsc2U7XG4gICAgICAgICAgICAkKCdodG1sJykuYW5pbWF0ZSh7XG4gICAgICAgICAgICAgICAgb3BhY2l0eTogMVxuICAgICAgICAgICAgfSwgMTAwMCk7XG4gICAgICAgICAgICAkKCcjcHJlbG9hZGVyJykuc3RvcCgpLmZhZGVPdXQoJ3Nsb3cnKTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgcmVuZGVyTGF5b3V0QmxvY2tzOiBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgaWYgKHRoaXMuaGVhZGVyKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgaGVhZGVyID0gcmVxdWlyZSgnLi9hcHAvdmlldy9oZWFkZXInKTtcbiAgICAgICAgdGhpcy5oZWFkZXIgPSBuZXcgaGVhZGVyKCk7XG5cbiAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgICAgICB2YXIgcmVuZGVyRnVuYyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoYXQuaGVhZGVyLnJlbmRlcigpO1xuICAgICAgICB9O1xuXG4gICAgICAgIGlmICgkLmlzUmVhZHkpIHtcbiAgICAgICAgICAgIHJlbmRlckZ1bmMoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJlbmRlckZ1bmMoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfSxcbn07IiwiLypcbiAqICBQcm90b3R5cGUgd29ya2luZyBzbGlkZSBkb3duIFxuICovXG4kKGZ1bmN0aW9uICgpIHtcbiAgICAvL2ZhZGUgaW5pdGlhbCBwYWdlIHNob3dcbiAgICAkKCdodG1sJykuYW5pbWF0ZSh7XG4gICAgICAgIG9wYWNpdHk6IDFcbiAgICB9LCAxMDAwKTtcblxuICAgIC8valF1ZXJ5IHRvIGNvbGxhcHNlIHRoZSBuYXZiYXIgb24gc2Nyb2xsXG4gICAgLyogICAgXG4gICAgICQod2luZG93KS5zY3JvbGwoZnVuY3Rpb24gKCkge1xuICAgICBpZiAoJChcIi5uYXZiYXJcIikub2Zmc2V0KCkudG9wID4gNTApIHtcbiAgICAgJChcIi5uYXZiYXItZml4ZWQtdG9wXCIpLmFkZENsYXNzKFwidG9wLW5hdi1jb2xsYXBzZVwiKTtcbiAgICAgfSBlbHNlIHtcbiAgICAgJChcIi5uYXZiYXItZml4ZWQtdG9wXCIpLnJlbW92ZUNsYXNzKFwidG9wLW5hdi1jb2xsYXBzZVwiKTtcbiAgICAgfVxuICAgICB9KTtcbiAgICAgKiAqL1xuICAgIC8valF1ZXJ5IGZvciBwYWdlIHNjcm9sbGluZyBmZWF0dXJlIC0gcmVxdWlyZXMgalF1ZXJ5IEVhc2luZyBwbHVnaW5cbiAgICAkKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgJCgnYS5wYWdlLXNjcm9sbCcpLmJpbmQoJ2NsaWNrJywgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICB2YXIgJGFuY2hvciA9ICQodGhpcyk7XG4gICAgICAgICAgICAkKCdodG1sLCBib2R5Jykuc3RvcCgpLmFuaW1hdGUoe1xuICAgICAgICAgICAgICAgIHNjcm9sbFRvcDogJCgkYW5jaG9yLmF0dHIoJ2hyZWYnKSkub2Zmc2V0KCkudG9wXG4gICAgICAgICAgICB9LCAxNTAwLCAnZWFzZUluT3V0RXhwbycpO1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cblxuICAgIHZhciB3aW5TaXplID0gJyc7XG4gICAgd2luZG93Lm9ucmVzaXplID0gb25XaW5kb3dSZXNpemU7XG4gICAgZnVuY3Rpb24gb25XaW5kb3dSZXNpemUoKSB7XG4gICAgICAgIHZhciB3aW5kb3dXaWR0aCA9ICQodGhpcykud2lkdGgoKTtcbiAgICAgICAgdmFyIG5ld1dpblNpemUgPSAneHMnOyAvLyBkZWZhdWx0IHZhbHVlLCBjaGVjayBmb3IgYWN0dWFsIHNpemVcbiAgICAgICAgaWYgKHdpbmRvd1dpZHRoID49IDEyMDApIHtcbiAgICAgICAgICAgIG5ld1dpblNpemUgPSAnbGcnO1xuICAgICAgICB9IGVsc2UgaWYgKHdpbmRvd1dpZHRoID49IDk5Mikge1xuICAgICAgICAgICAgbmV3V2luU2l6ZSA9ICdtZCc7XG4gICAgICAgIH0gZWxzZSBpZiAod2luZG93V2lkdGggPj0gNzY4KSB7XG4gICAgICAgICAgICBuZXdXaW5TaXplID0gJ3NtJztcbiAgICAgICAgfVxuICAgICAgICBpZiAobmV3V2luU2l6ZSAhPT0gd2luU2l6ZSkge1xuICAgICAgICAgICAgd2luU2l6ZSA9IG5ld1dpblNpemU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgb25XaW5kb3dSZXNpemUoKTtcblxuICAgIC8vaGlkZSBuYXZiYXIgb24gbWVudSBjbGljayhvbmx5IG9uIG1vYmlsZXN8IHhzKVxuICAgICQoJy5uYXYgYScpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHdpblNpemUgPT09ICd4cycpIHtcbiAgICAgICAgICAgICQoJy5uYXZiYXItdG9nZ2xlJykuY2xpY2soKTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgLypcbiAgICAgdmFyIHdheXBvaW50ID0gbmV3IFdheXBvaW50KHtcbiAgICAgZWxlbWVudDogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2hvbWUnKSxcbiAgICAgb2Zmc2V0OiAnLTUwcHgnLFxuICAgICBoYW5kbGVyOiBmdW5jdGlvbiAoZGlyZWN0aW9uKSB7XG4gICAgIGNvbnNvbGUubG9nKCd3b3JrcycsIGRpcmVjdGlvbik7XG4gICAgIHZhciAkYm9keSA9ICQoJ2JvZHknKTtcbiAgICAgdmFyICRuYXZiYXIgPSAkKFwiLm5hdmJhci1maXhlZC10b3BcIik7XG4gICAgIGlmICgnZG93bicgPT09IGRpcmVjdGlvbikge1xuICAgICAkYm9keS5hZGRDbGFzcygnc2hvdy1saXN0Jyk7XG4gICAgICRuYXZiYXIuYWRkQ2xhc3MoXCJ0b3AtbmF2LWNvbGxhcHNlXCIpO1xuICAgICBcbiAgICAgfSBlbHNlIHtcbiAgICAgJGJvZHkucmVtb3ZlQ2xhc3MoJ3Nob3ctbGlzdCcpO1xuICAgICAkYm9keS5yZW1vdmVDbGFzcygnc2hvdy12aWRlbycpO1xuICAgICAkbmF2YmFyLnJlbW92ZUNsYXNzKFwidG9wLW5hdi1jb2xsYXBzZVwiKTtcbiAgICAgfVxuICAgICB9XG4gICAgIH0pO1xuICAgICAqL1xuICAgIHZhciAkYm9keSA9ICQoJ2JvZHknKTtcbiAgICB2YXIgJG5hdmJhciA9ICQoXCIubmF2YmFyLWZpeGVkLXRvcFwiKTtcbiAgICAkKHdpbmRvdykuc2Nyb2xsKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKCQoXCIubmF2YmFyXCIpLm9mZnNldCgpLnRvcCA+IDUwKSB7XG4gICAgICAgICAgICAkYm9keS5hZGRDbGFzcygnc2hvdy1saXN0Jyk7XG4gICAgICAgICAgICAkbmF2YmFyLmFkZENsYXNzKFwidG9wLW5hdi1jb2xsYXBzZVwiKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICRib2R5LnJlbW92ZUNsYXNzKCdzaG93LWxpc3QnKTtcbiAgICAgICAgICAgICRib2R5LnJlbW92ZUNsYXNzKCdzaG93LXZpZGVvJyk7XG4gICAgICAgICAgICAkbmF2YmFyLnJlbW92ZUNsYXNzKFwidG9wLW5hdi1jb2xsYXBzZVwiKTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgdmFyIGRvYyA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudDtcbiAgICB2YXIgdG9wID0gKHdpbmRvdy5wYWdlWU9mZnNldCB8fCBkb2Muc2Nyb2xsVG9wKSAtIChkb2MuY2xpZW50VG9wIHx8IDApO1xuXG4gICAgJCgnI2xpc3QnKS5vbignY2xpY2snLCAnLnZpZGVvLWxpc3QtaXRlbScsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgJGJvZHkuYWRkQ2xhc3MoJ3Nob3ctdmlkZW8nKTtcbiAgICAgICAgdG9wID0gKHdpbmRvdy5wYWdlWU9mZnNldCB8fCBkb2Muc2Nyb2xsVG9wKSAtIChkb2MuY2xpZW50VG9wIHx8IDApO1xuICAgIH0pO1xuXG4gICAgJCh3aW5kb3cpLm9uKCdzY3JvbGwnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBuZXdUb3AgPSAod2luZG93LnBhZ2VZT2Zmc2V0IHx8IGRvYy5zY3JvbGxUb3ApIC0gKGRvYy5jbGllbnRUb3AgfHwgMCk7XG4gICAgICAgIGNvbnNvbGUubG9nKCdFdmVudCBGaXJlZCcsIHRvcCwgbmV3VG9wKTtcbiAgICAgICAgaWYgKG5ld1RvcCAhPT0gdG9wKSB7XG4gICAgICAgICAgICAkYm9keS5yZW1vdmVDbGFzcygnc2hvdy12aWRlbycpO1xuICAgICAgICB9XG4gICAgfSk7XG5cbn0pO1xuLypcbiAqICBJbXBsZXJtZW50aW5nIGJhY2tib25lXG4gKi9cbiQoZnVuY3Rpb24gKCkge1xuICAgIEFwcC5pbml0KCk7XG59KTtcblxud2luZG93LkFwcCA9IHtcbiAgICBNb2RlbHM6IHt9LFxuICAgIENvbGxlY3Rpb25zOiB7fSxcbiAgICBWaWV3czoge1xuICAgICAgICBBYnN0cmFjdDoge30sXG4gICAgICAgIERpYWxvZ3M6IHt9LFxuICAgICAgICBQYWdlczoge30sXG4gICAgICAgIFdpZGdldHM6IHt9LFxuICAgICAgICBQYXJ0czoge30sXG4gICAgICAgIENoYXJ0czoge31cbiAgICB9LFxuICAgIFRvdXJzOiB7fSxcbiAgICBjdXJyZW50VG91cjogbnVsbCxcbiAgICByb3V0ZXI6IG51bGwsXG4gICAgZGlhbG9nOiBudWxsLFxuICAgIHBhZ2U6IG51bGwsXG4gICAgaGVhZGVyOiBudWxsLFxuICAgIGZvb3RlcjogbnVsbCxcbiAgICBzZXR0aW5nczogbnVsbCxcbiAgICBjdXJyZW50VXNlcjogbnVsbCxcbiAgICBpbml0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICAgICAgJC5hamF4U2V0dXAoe1xuICAgICAgICAgICAgY2FjaGU6IGZhbHNlXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHZhciBkb25lQ2FsbGJhY2sgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBhbGVydCgnZG9uZSBjYWxsYmFjaycpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgdGhhdC5sb2NhbFN0b3JhZ2UuaW52YWxpZGF0ZSh0aGF0LnNldHRpbmdzLnZlcnNpb24pO1xuICAgICAgICAgICAgdGhhdC5pMThuLnNldExhbmd1YWdlKHRoYXQuc2V0dGluZ3MuZGV0ZWN0TGFuZ3VhZ2UoKSk7XG4gICAgICAgICAgICB0aGF0LnJvdXRlci5pbml0KCk7XG4gICAgICAgICAgICB0aGF0LmxvYWRpbmdTdGF0dXMoZmFsc2UpO1xuICAgICAgICB9O1xuXG4gICAgICAgIGlmIChkb2N1bWVudC5jb29raWUuaW5kZXhPZihcImlzX2xvZ2dlZF9pbl91c2VyXCIpID49IDApIHtcbiAgICAgICAgICAgICQuZ2V0KHRoaXMuc2V0dGluZ3MuYXBpRW50cnlQb2ludCArICd1c2VycycsIGZ1bmN0aW9uICh1c2VyKSB7XG4gICAgICAgICAgICAgICAgaWYgKHVzZXIpXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuc2V0VXNlcih1c2VyKTtcbiAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuc2V0VXNlcigpO1xuICAgICAgICAgICAgfSwgJ2pzb24nKVxuICAgICAgICAgICAgICAgICAgICAuZmFpbChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnNldFVzZXIoKTtcbiAgICAgICAgICAgICAgICAgICAgfSkuYWx3YXlzKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBkb25lQ2FsbGJhY2soKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhhdC5zZXRVc2VyKCk7XG4gICAgICAgICAgICBkb25lQ2FsbGJhY2soKTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgc2hvd0RpYWxvZzogZnVuY3Rpb24gKGRpYWxvZ05hbWUsIHBhcmFtcykge1xuICAgICAgICBpZiAodHlwZW9mIChBcHAuVmlld3MuRGlhbG9nc1tkaWFsb2dOYW1lXSkgPT09ICd1bmRlZmluZWQnKSAvLy8gdGhpcyBwYWdlIGlzIGFscmVhZHkgY3VycmVudFxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuXG4gICAgICAgIGlmIChBcHAuZGlhbG9nICYmIEFwcC5kaWFsb2cuaXNWaXNpYmxlKSB7XG4gICAgICAgICAgICBBcHAuZGlhbG9nLm9uY2UoJ2hpZGRlbicsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnUmVhZHkgdG8gc2hvdyBhbm90aGVyIGRpYWxvZycpO1xuICAgICAgICAgICAgICAgIEFwcC5kaWFsb2cgPSBuZXcgQXBwLlZpZXdzLkRpYWxvZ3NbZGlhbG9nTmFtZV0ocGFyYW1zKTtcbiAgICAgICAgICAgIH0sIHRoaXMpO1xuICAgICAgICAgICAgQXBwLmRpYWxvZy5oaWRlKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBBcHAuZGlhbG9nID0gbmV3IEFwcC5WaWV3cy5EaWFsb2dzW2RpYWxvZ05hbWVdKHBhcmFtcyk7XG4gICAgICAgICAgICBBcHAubG9nLmV2ZW50KCdkaWFsb2cnLCAnU2hvdyBEaWFsb2cgJyArIGRpYWxvZ05hbWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSxcbiAgICBzaG93UGFnZTogZnVuY3Rpb24gKHBhZ2VOYW1lLCBwYXJhbXMpIHtcblxuICAgICAgICBjb25zb2xlLmxvZygnU2hvd2luZyBwYWdlOiAnICsgcGFnZU5hbWUpO1xuXG4gICAgICAgIGlmIChBcHAuY3VycmVudFRvdXIpXG4gICAgICAgICAgICBBcHAuY3VycmVudFRvdXIuZmluaXNoKCk7XG5cbiAgICAgICAgaWYgKHR5cGVvZiAocGFyYW1zKSA9PT0gJ3VuZGVmaW5lZCcpXG4gICAgICAgICAgICBwYXJhbXMgPSB7fTtcblxuICAgICAgICBpZiAodHlwZW9mIChBcHAuVmlld3MuUGFnZXNbcGFnZU5hbWVdKSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJUaGVyZSBpcyBubyB2aWV3IGNsYXNzIGRlZmluZWRcIik7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodHlwZW9mICh0aGlzLnBhZ2UpICE9PSAndW5kZWZpbmVkJyAmJiB0aGlzLnBhZ2UpIC8vLyB1bmRlbGVnYXRlIGV2ZW50cyBmcm9tIHByZXZpb3VzIHBhZ2VcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5wYWdlLnNsZWVwKCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLy8gVHJ5aW5nIHRvIGdldCB2aWV3IGZyb20gc3RhY2tcbiAgICAgICAgdmFyIGZyb21TdGFjayA9IHRoaXMudmlld1N0YWNrLmdldFZpZXcocGFnZU5hbWUsIHBhcmFtcyk7XG5cblxuICAgICAgICBpZiAoZnJvbVN0YWNrICE9PSBmYWxzZSkge1xuICAgICAgICAgICAgLy8vIENvbnNvbGUgbG9nIHdha2UgdXAgcGFnZSBmcm9tIHN0YWNrXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnU2hvd2luZyBwYWdlIGZyb20gc3RhY2snKTtcbiAgICAgICAgICAgIHRoaXMucGFnZSA9IGZyb21TdGFjaztcbiAgICAgICAgICAgIHRoaXMucGFnZS53YWtlVXAoKTtcbiAgICAgICAgICAgIHRoaXMubG9hZGluZ1N0YXR1cyhmYWxzZSk7XG5cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vLyBvciBjcmVhdGUgbmV3IG9uZVxuICAgICAgICAgICAgdGhpcy5sb2FkaW5nU3RhdHVzKHRydWUpO1xuICAgICAgICAgICAgdGhpcy5wYWdlID0gbmV3IEFwcC5WaWV3cy5QYWdlc1twYWdlTmFtZV0ocGFyYW1zKTtcbiAgICAgICAgICAgIHRoaXMucGFnZS5vbignbG9hZGVkJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHRoaXMubG9hZGluZ1N0YXR1cyhmYWxzZSk7XG4gICAgICAgICAgICB9LCB0aGlzKTtcbiAgICAgICAgICAgIGlmICh0aGlzLnBhZ2UuaXNSZWFkeSlcbiAgICAgICAgICAgICAgICB0aGlzLmxvYWRpbmdTdGF0dXMoZmFsc2UpO1xuICAgICAgICAgICAgLy8gdGhpcy5saXN0ZW5Ubyh0aGlzLnBhZ2UsICdsb2FkZWQnLCBmdW5jdGlvbigpeyB0aGlzLmxvYWRpbmdTdGF0dXMoZmFsc2UpOyB9KTtcbiAgICAgICAgICAgIC8vIHRoaXMubGlzdGVuVG8odGhpcy5wYWdlLCAnbG9hZGluZycsIGZ1bmN0aW9uKCl7IHRoaXMubG9hZGluZ1N0YXR1cyh0cnVlKTsgfSk7XG5cbiAgICAgICAgICAgIHRoaXMudmlld1N0YWNrLmFkZFZpZXcocGFnZU5hbWUsIHBhcmFtcywgdGhpcy5wYWdlKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnJlbmRlckxheW91dEJsb2NrcygpO1xuXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH0sXG4gICAgc2V0UHJvZ3Jlc3M6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICBpZiAoIXRoaXMucHJvZ3Jlc3MpXG4gICAgICAgICAgICB0aGlzLnByb2dyZXNzID0gbmV3IE1wcm9ncmVzcygpO1xuXG4gICAgICAgIGlmICh0eXBlb2YgKHZhbHVlKSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnByb2dyZXNzLnN0YXR1cyA9PT0gbnVsbClcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5wcm9ncmVzcy5zdGFydCgpO1xuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnByb2dyZXNzLmluYygpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh2YWx1ZSA+PSAxIHx8IHZhbHVlID09PSB0cnVlKVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMucHJvZ3Jlc3MuZW5kKCk7XG4gICAgICAgIHRoaXMucHJvZ3Jlc3Muc2V0KHZhbHVlKTtcbiAgICB9LFxuICAgIGxvYWRpbmdTdGF0dXM6IGZ1bmN0aW9uIChzdGF0dXMpIHtcbiAgICAgICAgaWYgKHN0YXR1cykge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ2FwcC5qcyB8IExvYWRpbmcgc3RhdHVzID0gdHJ1ZScpO1xuICAgICAgICAgICAgdGhpcy5pc0xvYWRpbmcgPSB0cnVlO1xuICAgICAgICAgICAgJCgnI3ByZWxvYWRlcicpLnN0b3AoKS5zaG93KCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnYXBwLmpzIHwgTG9hZGluZyBzdGF0dXMgPSBmYWxzZScpO1xuICAgICAgICAgICAgdGhpcy5pc0xvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICQoJyNwcmVsb2FkZXInKS5zdG9wKCkuZmFkZU91dCgnc2xvdycpO1xuICAgICAgICB9XG4gICAgfSxcbiAgICBzZXRVc2VyOiBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICB0aGlzLmN1cnJlbnRVc2VyID0gbmV3IEFwcC5Nb2RlbHMuVXNlcigpO1xuICAgICAgICB0aGlzLmN1cnJlbnRVc2VyLm9uKCdzaWduZWRJblN0YXR1c0NoYW5nZWQnLCB0aGlzLnVzZXJDaGFuZ2VkLCB0aGlzKTtcbiAgICAgICAgaWYgKHR5cGVvZiAoZGF0YSkgIT09ICd1bmRlZmluZWQnKVxuICAgICAgICAgICAgdGhpcy5jdXJyZW50VXNlci5zaWduSW5XaXRoRGF0YShkYXRhKTtcbiAgICB9LFxuICAgIHVzZXJDaGFuZ2VkOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdVc2VyIGluZm8gY2hhbmdlZCcpO1xuICAgICAgICAvLyBZb3UgY2FuIGFsc28gcmVmcmVzaCB0aGUgcGFnZSBoZXJlIGlmIHlvdSB3YW50IHRvLlxuXG4gICAgICAgIHRoaXMucmVuZGVyTGF5b3V0QmxvY2tzKCk7XG4gICAgfSxcbiAgICByZW5kZXJMYXlvdXRCbG9ja3M6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xuXG4gICAgICAgIGlmICghdGhpcy5oZWFkZXIpIHtcbiAgICAgICAgICAgIHRoaXMuaGVhZGVyID0gbmV3IEFwcC5WaWV3cy5IZWFkZXIoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciByZW5kZXJGdW5jID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhhdC5oZWFkZXIucmVuZGVyKCk7XG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKCQuaXNSZWFkeSkge1xuICAgICAgICAgICAgcmVuZGVyRnVuYygpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgJChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmVuZGVyRnVuYygpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIGNyZWF0ZUNvb2tpZTogZnVuY3Rpb24gKG5hbWUsIHZhbHVlLCBkYXlzKSB7XG4gICAgICAgIHZhciBleHBpcmVzO1xuXG4gICAgICAgIGlmIChkYXlzKSB7XG4gICAgICAgICAgICB2YXIgZGF0ZSA9IG5ldyBEYXRlKCk7XG4gICAgICAgICAgICBkYXRlLnNldFRpbWUoZGF0ZS5nZXRUaW1lKCkgKyAoZGF5cyAqIDI0ICogNjAgKiA2MCAqIDEwMDApKTtcbiAgICAgICAgICAgIGV4cGlyZXMgPSBcIjsgZXhwaXJlcz1cIiArIGRhdGUudG9HTVRTdHJpbmcoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGV4cGlyZXMgPSBcIlwiO1xuICAgICAgICB9XG4gICAgICAgIGRvY3VtZW50LmNvb2tpZSA9IGVuY29kZVVSSUNvbXBvbmVudChuYW1lKSArIFwiPVwiICsgZW5jb2RlVVJJQ29tcG9uZW50KHZhbHVlKSArIGV4cGlyZXMgKyBcIjsgcGF0aD0vXCI7XG4gICAgfSxcbiAgICByZWFkQ29va2llOiBmdW5jdGlvbiAobmFtZSkge1xuICAgICAgICB2YXIgbmFtZUVRID0gZW5jb2RlVVJJQ29tcG9uZW50KG5hbWUpICsgXCI9XCI7XG4gICAgICAgIHZhciBjYSA9IGRvY3VtZW50LmNvb2tpZS5zcGxpdCgnOycpO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNhLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgYyA9IGNhW2ldO1xuICAgICAgICAgICAgd2hpbGUgKGMuY2hhckF0KDApID09PSAnICcpXG4gICAgICAgICAgICAgICAgYyA9IGMuc3Vic3RyaW5nKDEsIGMubGVuZ3RoKTtcbiAgICAgICAgICAgIGlmIChjLmluZGV4T2YobmFtZUVRKSA9PT0gMClcbiAgICAgICAgICAgICAgICByZXR1cm4gZGVjb2RlVVJJQ29tcG9uZW50KGMuc3Vic3RyaW5nKG5hbWVFUS5sZW5ndGgsIGMubGVuZ3RoKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfSxcbiAgICBlcmFzZUNvb2tpZTogZnVuY3Rpb24gKG5hbWUpIHtcbiAgICAgICAgQXBwLmNyZWF0ZUNvb2tpZShuYW1lLCBcIlwiLCAtMSk7XG4gICAgfVxuXG59O1xuXG5cbi8qZGVidWcqL1xuZnVuY3Rpb24gaW5jbHVkZUNzc0RlYnVnKGUpIHtcbiAgICB2YXIgZXZ0b2JqID0gd2luZG93LmV2ZW50ID8gZXZlbnQgOiBlXG4gICAgaWYgKGV2dG9iai5rZXlDb2RlID09IDkwICYmIGV2dG9iai5jdHJsS2V5KSB7XG5cbiAgICAgICAgdmFyIGNzc0lkID0gJ2RlYnVnLWJvb3RzdHJhcCc7ICAvLyB5b3UgY291bGQgZW5jb2RlIHRoZSBjc3MgcGF0aCBpdHNlbGYgdG8gZ2VuZXJhdGUgaWQuLlxuICAgICAgICBpZiAoIWRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGNzc0lkKSlcbiAgICAgICAge1xuICAgICAgICAgICAgdmFyIGhlYWQgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaGVhZCcpWzBdO1xuICAgICAgICAgICAgdmFyIGxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaW5rJyk7XG4gICAgICAgICAgICBsaW5rLmlkID0gY3NzSWQ7XG4gICAgICAgICAgICBsaW5rLnJlbCA9ICdzdHlsZXNoZWV0JztcbiAgICAgICAgICAgIGxpbmsudHlwZSA9ICd0ZXh0L2Nzcyc7XG4gICAgICAgICAgICBsaW5rLmhyZWYgPSAnc3JjL2Nzcy9ib290c3RyYXAtcmVzcG9uc2l2ZS1kZWJ1Zy5jc3MnO1xuICAgICAgICAgICAgbGluay5tZWRpYSA9ICdhbGwnO1xuICAgICAgICAgICAgaGVhZC5hcHBlbmRDaGlsZChsaW5rKTtcbiAgICAgICAgfVxuXG4gICAgfVxufVxuXG5kb2N1bWVudC5vbmtleWRvd24gPSBpbmNsdWRlQ3NzRGVidWc7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBBcHAgPSByZXF1aXJlKCcuL2FwcCcpO1xuXG4vKlxuICogIEltcGxlcm1lbnRpbmcgYmFja2JvbmVcbiAqL1xuJChmdW5jdGlvbiAoKSB7XG4gICAgQXBwLmluaXQoKTtcbn0pO1xuXG4vKmRlYnVnKi9cbmZ1bmN0aW9uIGluY2x1ZGVDc3NEZWJ1ZyhlKSB7XG4gICAgdmFyIGV2dG9iaiA9IHdpbmRvdy5ldmVudCA/IGV2ZW50IDogZVxuICAgIGlmIChldnRvYmoua2V5Q29kZSA9PSA5MCAmJiBldnRvYmouY3RybEtleSkge1xuXG4gICAgICAgIHZhciBjc3NJZCA9ICdkZWJ1Zy1ib290c3RyYXAnOyAgLy8geW91IGNvdWxkIGVuY29kZSB0aGUgY3NzIHBhdGggaXRzZWxmIHRvIGdlbmVyYXRlIGlkLi5cbiAgICAgICAgaWYgKCFkb2N1bWVudC5nZXRFbGVtZW50QnlJZChjc3NJZCkpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHZhciBoZWFkID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2hlYWQnKVswXTtcbiAgICAgICAgICAgIHZhciBsaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGluaycpO1xuICAgICAgICAgICAgbGluay5pZCA9IGNzc0lkO1xuICAgICAgICAgICAgbGluay5yZWwgPSAnc3R5bGVzaGVldCc7XG4gICAgICAgICAgICBsaW5rLnR5cGUgPSAndGV4dC9jc3MnO1xuICAgICAgICAgICAgbGluay5ocmVmID0gJ3NyYy9jc3MvYm9vdHN0cmFwLXJlc3BvbnNpdmUtZGVidWcuY3NzJztcbiAgICAgICAgICAgIGxpbmsubWVkaWEgPSAnYWxsJztcbiAgICAgICAgICAgIGhlYWQuYXBwZW5kQ2hpbGQobGluayk7XG4gICAgICAgIH1cblxuICAgIH1cbn1cblxuZG9jdW1lbnQub25rZXlkb3duID0gaW5jbHVkZUNzc0RlYnVnO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
