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
            /*debugger;*/
            this.page.sleep();
        }

        if (fromStack !== false) {
            /// Console log wake up page from stack
            console.log('Showing page from stack');
            this.page = fromStack;
            this.page.wakeUp();
            /*this.loadingStatus(false);*/

        } else {
            /// or create new one
            console.log('Loading new page');
            /*this.loadingStatus(true);*/
            this.page = new this.Views.Pages[pageName](params);
            /*            
             this.page.on('loaded', function () {
             this.loadingStatus(false);
             }, this);
             
             if (this.page.isReady)
             this.loadingStatus(false);
             * */

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
            //$('#preloader').stop().show();
        } else {
            console.log('app.js | Loading status = false');
            this.isLoading = false;
            $('html').animate({
                opacity: 1
            }, 1000);
            //$('#preloader').stop().fadeOut('slow');
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsIm1haW4uYmFrLmpzIiwibWFpbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzlLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNyVkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG52YXIgc2V0dGluZ3MgPSByZXF1aXJlKCcuL2FwcC9zZXR0aW5ncycpO1xudmFyIHZpZXdTdGFjayA9IHJlcXVpcmUoJy4vYXBwL3ZpZXdfc3RhY2snKTtcbi8vIHZhciBMYXlvdXRNYW5hZ2VyID0gcmVxdWlyZSgnYmFja2JvbmUubGF5b3V0bWFuYWdlcicpO1xuLy8gY29uc29sZS5sb2coc2V0dGluZ3MpO1xuLyp2YXIgUm91dGVyID0gcmVxdWlyZSgnLi9hcHAvcm91dGVyJyk7Ki9cblxuXG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIE1vZGVsczoge30sXG4gICAgQ29sbGVjdGlvbnM6IHt9LFxuICAgIFZpZXdzOiB7XG4gICAgICAgIC8vIEFic3RyYWN0OiB7fSxcbiAgICAgICAgLy8gRGlhbG9nczoge30sXG4gICAgICAgIFBhZ2VzOiB7XG4gICAgICAgICAgICBJbmRleDogcmVxdWlyZSgnLi9hcHAvdmlldy9wYWdlcy9pbmRleCcpLFxuICAgICAgICAgICAgUGFnZTogcmVxdWlyZSgnLi9hcHAvdmlldy9wYWdlcy9wYWdlJylcbiAgICAgICAgfSxcbiAgICAgICAgLy8gV2lkZ2V0czoge30sXG4gICAgICAgIFBhcnRzOiB7XG4gICAgICAgICAgICBIZWFkZXI6IHJlcXVpcmUoJy4vYXBwL3ZpZXcvaGVhZGVyJylcbiAgICAgICAgfSxcbiAgICAgICAgLy8gQ2hhcnRzOiB7fVxuICAgIH0sXG4gICAgLypyb3V0ZXI6IHJlcXVpcmUoJy4vYXBwL3JvdXRlcicpLCovXG4gICAgLy8gVG91cnM6IHt9LFxuICAgIC8vIGN1cnJlbnRUb3VyOiBudWxsLFxuICAgIC8vIC8vcm91dGVyOiBudWxsLFxuICAgIC8vIGRpYWxvZzogbnVsbCxcbiAgICBwYWdlOiBudWxsLFxuICAgIGhlYWRlcjogbnVsbCxcbiAgICAvLyBmb290ZXI6IG51bGwsXG4gICAgLy8gc2V0dGluZ3M6IG51bGwsXG4gICAgLy8gY3VycmVudFVzZXI6IG51bGwsXG4gICAgaW5pdDogZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgICAgICQuYWpheFNldHVwKHtcbiAgICAgICAgICAgIGNhY2hlOiBmYWxzZVxuICAgICAgICB9KTtcblxuICAgICAgICB2YXIgZG9uZUNhbGxiYWNrID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIHJvdXRlciA9IHJlcXVpcmUoJy4vYXBwL3JvdXRlcicpO1xuXG4gICAgICAgICAgICByb3V0ZXIuaW5pdCgpO1xuICAgICAgICAgICAgdGhhdC5sb2FkaW5nU3RhdHVzKGZhbHNlKTtcbiAgICAgICAgfTtcbiAgICAgICAgZG9uZUNhbGxiYWNrKCk7XG5cbiAgICB9LFxuICAgIHNob3dQYWdlOiBmdW5jdGlvbiAocGFnZU5hbWUsIHBhcmFtcykge1xuICAgICAgICBpZiAodHlwZW9mICh0aGlzLlZpZXdzLlBhZ2VzW3BhZ2VOYW1lXSkgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiVGhlcmUgaXMgbm8gdmlldyBjbGFzcyBkZWZpbmVkXCIpO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5yZW5kZXJMYXlvdXRCbG9ja3MoKTtcblxuICAgICAgICBjb25zb2xlLmdyb3VwKCclYy0gU2hvd2luZyBwYWdlOiAlcyAtJywgJ2JhY2tncm91bmQ6ICMyMjI7IGNvbG9yOiAjYmFkYTU1JywgcGFnZU5hbWUpO1xuICAgICAgICAvLyBpZiAoQXBwLmN1cnJlbnRUb3VyKVxuICAgICAgICAvLyBBcHAuY3VycmVudFRvdXIuZmluaXNoKCk7XG5cbiAgICAgICAgaWYgKHR5cGVvZiAocGFyYW1zKSA9PT0gJ3VuZGVmaW5lZCcpXG4gICAgICAgICAgICBwYXJhbXMgPSB7fTtcblxuICAgICAgICB2YXIgX2hhc2ggPSB0cnVlO1xuICAgICAgICBpZiAodHlwZW9mIChwYXJhbXMuaGFzaCkgIT09ICd1bmRlZmluZWQnICYmICFwYXJhbXMuaGFzaCkge1xuICAgICAgICAgICAgX2hhc2ggPSBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vLyBUcnlpbmcgdG8gZ2V0IHZpZXcgZnJvbSBzdGFja1xuICAgICAgICB2YXIgZnJvbVN0YWNrID0gdmlld1N0YWNrLmdldFZpZXcocGFnZU5hbWUsIHBhcmFtcywgX2hhc2gpO1xuXG4gICAgICAgIC8vIGlmIHNhbWUgdmlldyBqdXN0IHVwZGF0ZVxuICAgICAgICBpZiAodHlwZW9mICh0aGlzLnBhZ2UpICE9PSAndW5kZWZpbmVkJyAmJiBmcm9tU3RhY2spIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnBhZ2UuY2lkID09PSBmcm9tU3RhY2suY2lkKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ1VwZGF0aW5nIGN1cnJlbnQgdmlldyAlcycsIHBhZ2VOYW1lKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmdyb3VwRW5kKCk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLnBhZ2UudXBkYXRlKHBhcmFtcyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyB1bmRlbGVnYXRlIGV2ZW50cyBmcm9tIHByZXZpb3VzIHBhZ2VcbiAgICAgICAgaWYgKHR5cGVvZiAodGhpcy5wYWdlKSAhPT0gJ3VuZGVmaW5lZCcgJiYgdGhpcy5wYWdlKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnc2xlZXAgYXBwLmpzJywgdGhpcy5wYWdlLnBhcnRzKTtcbiAgICAgICAgICAgIC8qZGVidWdnZXI7Ki9cbiAgICAgICAgICAgIHRoaXMucGFnZS5zbGVlcCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGZyb21TdGFjayAhPT0gZmFsc2UpIHtcbiAgICAgICAgICAgIC8vLyBDb25zb2xlIGxvZyB3YWtlIHVwIHBhZ2UgZnJvbSBzdGFja1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ1Nob3dpbmcgcGFnZSBmcm9tIHN0YWNrJyk7XG4gICAgICAgICAgICB0aGlzLnBhZ2UgPSBmcm9tU3RhY2s7XG4gICAgICAgICAgICB0aGlzLnBhZ2Uud2FrZVVwKCk7XG4gICAgICAgICAgICAvKnRoaXMubG9hZGluZ1N0YXR1cyhmYWxzZSk7Ki9cblxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8vIG9yIGNyZWF0ZSBuZXcgb25lXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnTG9hZGluZyBuZXcgcGFnZScpO1xuICAgICAgICAgICAgLyp0aGlzLmxvYWRpbmdTdGF0dXModHJ1ZSk7Ki9cbiAgICAgICAgICAgIHRoaXMucGFnZSA9IG5ldyB0aGlzLlZpZXdzLlBhZ2VzW3BhZ2VOYW1lXShwYXJhbXMpO1xuICAgICAgICAgICAgLyogICAgICAgICAgICBcbiAgICAgICAgICAgICB0aGlzLnBhZ2Uub24oJ2xvYWRlZCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICB0aGlzLmxvYWRpbmdTdGF0dXMoZmFsc2UpO1xuICAgICAgICAgICAgIH0sIHRoaXMpO1xuICAgICAgICAgICAgIFxuICAgICAgICAgICAgIGlmICh0aGlzLnBhZ2UuaXNSZWFkeSlcbiAgICAgICAgICAgICB0aGlzLmxvYWRpbmdTdGF0dXMoZmFsc2UpO1xuICAgICAgICAgICAgICogKi9cblxuICAgICAgICAgICAgdmlld1N0YWNrLmFkZFZpZXcocGFnZU5hbWUsIHBhcmFtcywgdGhpcy5wYWdlLCBfaGFzaCk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc29sZS5ncm91cEVuZCgpO1xuXG5cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSxcbiAgICBzZXRQcm9ncmVzczogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIGlmICghdGhpcy5wcm9ncmVzcylcbiAgICAgICAgICAgIHRoaXMucHJvZ3Jlc3MgPSBuZXcgTXByb2dyZXNzKCk7XG5cbiAgICAgICAgaWYgKHR5cGVvZiAodmFsdWUpID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgaWYgKHRoaXMucHJvZ3Jlc3Muc3RhdHVzID09PSBudWxsKVxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnByb2dyZXNzLnN0YXJ0KCk7XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucHJvZ3Jlc3MuaW5jKCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHZhbHVlID49IDEgfHwgdmFsdWUgPT09IHRydWUpXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wcm9ncmVzcy5lbmQoKTtcblxuICAgICAgICB0aGlzLnByb2dyZXNzLnNldCh2YWx1ZSk7XG4gICAgfSxcbiAgICBsb2FkaW5nU3RhdHVzOiBmdW5jdGlvbiAoc3RhdHVzKSB7XG4gICAgICAgIGlmIChzdGF0dXMpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdhcHAuanMgfCBMb2FkaW5nIHN0YXR1cyA9IHRydWUnKTtcbiAgICAgICAgICAgIHRoaXMuaXNMb2FkaW5nID0gdHJ1ZTtcbiAgICAgICAgICAgIC8vICQoJ2h0bWwnKS5hbmltYXRlKHtcbiAgICAgICAgICAgIC8vICAgICBvcGFjaXR5OiAwXG4gICAgICAgICAgICAvLyB9LCAxMDAwKTtcbiAgICAgICAgICAgIC8vJCgnI3ByZWxvYWRlcicpLnN0b3AoKS5zaG93KCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnYXBwLmpzIHwgTG9hZGluZyBzdGF0dXMgPSBmYWxzZScpO1xuICAgICAgICAgICAgdGhpcy5pc0xvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICQoJ2h0bWwnKS5hbmltYXRlKHtcbiAgICAgICAgICAgICAgICBvcGFjaXR5OiAxXG4gICAgICAgICAgICB9LCAxMDAwKTtcbiAgICAgICAgICAgIC8vJCgnI3ByZWxvYWRlcicpLnN0b3AoKS5mYWRlT3V0KCdzbG93Jyk7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIHJlbmRlckxheW91dEJsb2NrczogZnVuY3Rpb24gKCkge1xuXG4gICAgICAgIGlmICh0aGlzLmhlYWRlcikge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGhlYWRlciA9IHJlcXVpcmUoJy4vYXBwL3ZpZXcvaGVhZGVyJyk7XG4gICAgICAgIHRoaXMuaGVhZGVyID0gbmV3IGhlYWRlcigpO1xuXG4gICAgICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICAgICAgdmFyIHJlbmRlckZ1bmMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGF0LmhlYWRlci5yZW5kZXIoKTtcbiAgICAgICAgfTtcblxuICAgICAgICBpZiAoJC5pc1JlYWR5KSB7XG4gICAgICAgICAgICByZW5kZXJGdW5jKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAkKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZW5kZXJGdW5jKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH0sXG59OyIsIi8qXG4gKiAgUHJvdG90eXBlIHdvcmtpbmcgc2xpZGUgZG93biBcbiAqL1xuJChmdW5jdGlvbiAoKSB7XG4gICAgLy9mYWRlIGluaXRpYWwgcGFnZSBzaG93XG4gICAgJCgnaHRtbCcpLmFuaW1hdGUoe1xuICAgICAgICBvcGFjaXR5OiAxXG4gICAgfSwgMTAwMCk7XG5cbiAgICAvL2pRdWVyeSB0byBjb2xsYXBzZSB0aGUgbmF2YmFyIG9uIHNjcm9sbFxuICAgIC8qICAgIFxuICAgICAkKHdpbmRvdykuc2Nyb2xsKGZ1bmN0aW9uICgpIHtcbiAgICAgaWYgKCQoXCIubmF2YmFyXCIpLm9mZnNldCgpLnRvcCA+IDUwKSB7XG4gICAgICQoXCIubmF2YmFyLWZpeGVkLXRvcFwiKS5hZGRDbGFzcyhcInRvcC1uYXYtY29sbGFwc2VcIik7XG4gICAgIH0gZWxzZSB7XG4gICAgICQoXCIubmF2YmFyLWZpeGVkLXRvcFwiKS5yZW1vdmVDbGFzcyhcInRvcC1uYXYtY29sbGFwc2VcIik7XG4gICAgIH1cbiAgICAgfSk7XG4gICAgICogKi9cbiAgICAvL2pRdWVyeSBmb3IgcGFnZSBzY3JvbGxpbmcgZmVhdHVyZSAtIHJlcXVpcmVzIGpRdWVyeSBFYXNpbmcgcGx1Z2luXG4gICAgJChmdW5jdGlvbiAoKSB7XG4gICAgICAgICQoJ2EucGFnZS1zY3JvbGwnKS5iaW5kKCdjbGljaycsIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgdmFyICRhbmNob3IgPSAkKHRoaXMpO1xuICAgICAgICAgICAgJCgnaHRtbCwgYm9keScpLnN0b3AoKS5hbmltYXRlKHtcbiAgICAgICAgICAgICAgICBzY3JvbGxUb3A6ICQoJGFuY2hvci5hdHRyKCdocmVmJykpLm9mZnNldCgpLnRvcFxuICAgICAgICAgICAgfSwgMTUwMCwgJ2Vhc2VJbk91dEV4cG8nKTtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG5cbiAgICB2YXIgd2luU2l6ZSA9ICcnO1xuICAgIHdpbmRvdy5vbnJlc2l6ZSA9IG9uV2luZG93UmVzaXplO1xuICAgIGZ1bmN0aW9uIG9uV2luZG93UmVzaXplKCkge1xuICAgICAgICB2YXIgd2luZG93V2lkdGggPSAkKHRoaXMpLndpZHRoKCk7XG4gICAgICAgIHZhciBuZXdXaW5TaXplID0gJ3hzJzsgLy8gZGVmYXVsdCB2YWx1ZSwgY2hlY2sgZm9yIGFjdHVhbCBzaXplXG4gICAgICAgIGlmICh3aW5kb3dXaWR0aCA+PSAxMjAwKSB7XG4gICAgICAgICAgICBuZXdXaW5TaXplID0gJ2xnJztcbiAgICAgICAgfSBlbHNlIGlmICh3aW5kb3dXaWR0aCA+PSA5OTIpIHtcbiAgICAgICAgICAgIG5ld1dpblNpemUgPSAnbWQnO1xuICAgICAgICB9IGVsc2UgaWYgKHdpbmRvd1dpZHRoID49IDc2OCkge1xuICAgICAgICAgICAgbmV3V2luU2l6ZSA9ICdzbSc7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG5ld1dpblNpemUgIT09IHdpblNpemUpIHtcbiAgICAgICAgICAgIHdpblNpemUgPSBuZXdXaW5TaXplO1xuICAgICAgICB9XG4gICAgfVxuICAgIG9uV2luZG93UmVzaXplKCk7XG5cbiAgICAvL2hpZGUgbmF2YmFyIG9uIG1lbnUgY2xpY2sob25seSBvbiBtb2JpbGVzfCB4cylcbiAgICAkKCcubmF2IGEnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh3aW5TaXplID09PSAneHMnKSB7XG4gICAgICAgICAgICAkKCcubmF2YmFyLXRvZ2dsZScpLmNsaWNrKCk7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIC8qXG4gICAgIHZhciB3YXlwb2ludCA9IG5ldyBXYXlwb2ludCh7XG4gICAgIGVsZW1lbnQ6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdob21lJyksXG4gICAgIG9mZnNldDogJy01MHB4JyxcbiAgICAgaGFuZGxlcjogZnVuY3Rpb24gKGRpcmVjdGlvbikge1xuICAgICBjb25zb2xlLmxvZygnd29ya3MnLCBkaXJlY3Rpb24pO1xuICAgICB2YXIgJGJvZHkgPSAkKCdib2R5Jyk7XG4gICAgIHZhciAkbmF2YmFyID0gJChcIi5uYXZiYXItZml4ZWQtdG9wXCIpO1xuICAgICBpZiAoJ2Rvd24nID09PSBkaXJlY3Rpb24pIHtcbiAgICAgJGJvZHkuYWRkQ2xhc3MoJ3Nob3ctbGlzdCcpO1xuICAgICAkbmF2YmFyLmFkZENsYXNzKFwidG9wLW5hdi1jb2xsYXBzZVwiKTtcbiAgICAgXG4gICAgIH0gZWxzZSB7XG4gICAgICRib2R5LnJlbW92ZUNsYXNzKCdzaG93LWxpc3QnKTtcbiAgICAgJGJvZHkucmVtb3ZlQ2xhc3MoJ3Nob3ctdmlkZW8nKTtcbiAgICAgJG5hdmJhci5yZW1vdmVDbGFzcyhcInRvcC1uYXYtY29sbGFwc2VcIik7XG4gICAgIH1cbiAgICAgfVxuICAgICB9KTtcbiAgICAgKi9cbiAgICB2YXIgJGJvZHkgPSAkKCdib2R5Jyk7XG4gICAgdmFyICRuYXZiYXIgPSAkKFwiLm5hdmJhci1maXhlZC10b3BcIik7XG4gICAgJCh3aW5kb3cpLnNjcm9sbChmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICgkKFwiLm5hdmJhclwiKS5vZmZzZXQoKS50b3AgPiA1MCkge1xuICAgICAgICAgICAgJGJvZHkuYWRkQ2xhc3MoJ3Nob3ctbGlzdCcpO1xuICAgICAgICAgICAgJG5hdmJhci5hZGRDbGFzcyhcInRvcC1uYXYtY29sbGFwc2VcIik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAkYm9keS5yZW1vdmVDbGFzcygnc2hvdy1saXN0Jyk7XG4gICAgICAgICAgICAkYm9keS5yZW1vdmVDbGFzcygnc2hvdy12aWRlbycpO1xuICAgICAgICAgICAgJG5hdmJhci5yZW1vdmVDbGFzcyhcInRvcC1uYXYtY29sbGFwc2VcIik7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIHZhciBkb2MgPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ7XG4gICAgdmFyIHRvcCA9ICh3aW5kb3cucGFnZVlPZmZzZXQgfHwgZG9jLnNjcm9sbFRvcCkgLSAoZG9jLmNsaWVudFRvcCB8fCAwKTtcblxuICAgICQoJyNsaXN0Jykub24oJ2NsaWNrJywgJy52aWRlby1saXN0LWl0ZW0nLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICRib2R5LmFkZENsYXNzKCdzaG93LXZpZGVvJyk7XG4gICAgICAgIHRvcCA9ICh3aW5kb3cucGFnZVlPZmZzZXQgfHwgZG9jLnNjcm9sbFRvcCkgLSAoZG9jLmNsaWVudFRvcCB8fCAwKTtcbiAgICB9KTtcblxuICAgICQod2luZG93KS5vbignc2Nyb2xsJywgZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgbmV3VG9wID0gKHdpbmRvdy5wYWdlWU9mZnNldCB8fCBkb2Muc2Nyb2xsVG9wKSAtIChkb2MuY2xpZW50VG9wIHx8IDApO1xuICAgICAgICBjb25zb2xlLmxvZygnRXZlbnQgRmlyZWQnLCB0b3AsIG5ld1RvcCk7XG4gICAgICAgIGlmIChuZXdUb3AgIT09IHRvcCkge1xuICAgICAgICAgICAgJGJvZHkucmVtb3ZlQ2xhc3MoJ3Nob3ctdmlkZW8nKTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG59KTtcbi8qXG4gKiAgSW1wbGVybWVudGluZyBiYWNrYm9uZVxuICovXG4kKGZ1bmN0aW9uICgpIHtcbiAgICBBcHAuaW5pdCgpO1xufSk7XG5cbndpbmRvdy5BcHAgPSB7XG4gICAgTW9kZWxzOiB7fSxcbiAgICBDb2xsZWN0aW9uczoge30sXG4gICAgVmlld3M6IHtcbiAgICAgICAgQWJzdHJhY3Q6IHt9LFxuICAgICAgICBEaWFsb2dzOiB7fSxcbiAgICAgICAgUGFnZXM6IHt9LFxuICAgICAgICBXaWRnZXRzOiB7fSxcbiAgICAgICAgUGFydHM6IHt9LFxuICAgICAgICBDaGFydHM6IHt9XG4gICAgfSxcbiAgICBUb3Vyczoge30sXG4gICAgY3VycmVudFRvdXI6IG51bGwsXG4gICAgcm91dGVyOiBudWxsLFxuICAgIGRpYWxvZzogbnVsbCxcbiAgICBwYWdlOiBudWxsLFxuICAgIGhlYWRlcjogbnVsbCxcbiAgICBmb290ZXI6IG51bGwsXG4gICAgc2V0dGluZ3M6IG51bGwsXG4gICAgY3VycmVudFVzZXI6IG51bGwsXG4gICAgaW5pdDogZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgICAgICQuYWpheFNldHVwKHtcbiAgICAgICAgICAgIGNhY2hlOiBmYWxzZVxuICAgICAgICB9KTtcblxuICAgICAgICB2YXIgZG9uZUNhbGxiYWNrID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgYWxlcnQoJ2RvbmUgY2FsbGJhY2snKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIHRoYXQubG9jYWxTdG9yYWdlLmludmFsaWRhdGUodGhhdC5zZXR0aW5ncy52ZXJzaW9uKTtcbiAgICAgICAgICAgIHRoYXQuaTE4bi5zZXRMYW5ndWFnZSh0aGF0LnNldHRpbmdzLmRldGVjdExhbmd1YWdlKCkpO1xuICAgICAgICAgICAgdGhhdC5yb3V0ZXIuaW5pdCgpO1xuICAgICAgICAgICAgdGhhdC5sb2FkaW5nU3RhdHVzKGZhbHNlKTtcbiAgICAgICAgfTtcblxuICAgICAgICBpZiAoZG9jdW1lbnQuY29va2llLmluZGV4T2YoXCJpc19sb2dnZWRfaW5fdXNlclwiKSA+PSAwKSB7XG4gICAgICAgICAgICAkLmdldCh0aGlzLnNldHRpbmdzLmFwaUVudHJ5UG9pbnQgKyAndXNlcnMnLCBmdW5jdGlvbiAodXNlcikge1xuICAgICAgICAgICAgICAgIGlmICh1c2VyKVxuICAgICAgICAgICAgICAgICAgICB0aGF0LnNldFVzZXIodXNlcik7XG4gICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICB0aGF0LnNldFVzZXIoKTtcbiAgICAgICAgICAgIH0sICdqc29uJylcbiAgICAgICAgICAgICAgICAgICAgLmZhaWwoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5zZXRVc2VyKCk7XG4gICAgICAgICAgICAgICAgICAgIH0pLmFsd2F5cyhmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgZG9uZUNhbGxiYWNrKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoYXQuc2V0VXNlcigpO1xuICAgICAgICAgICAgZG9uZUNhbGxiYWNrKCk7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIHNob3dEaWFsb2c6IGZ1bmN0aW9uIChkaWFsb2dOYW1lLCBwYXJhbXMpIHtcbiAgICAgICAgaWYgKHR5cGVvZiAoQXBwLlZpZXdzLkRpYWxvZ3NbZGlhbG9nTmFtZV0pID09PSAndW5kZWZpbmVkJykgLy8vIHRoaXMgcGFnZSBpcyBhbHJlYWR5IGN1cnJlbnRcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcblxuICAgICAgICBpZiAoQXBwLmRpYWxvZyAmJiBBcHAuZGlhbG9nLmlzVmlzaWJsZSkge1xuICAgICAgICAgICAgQXBwLmRpYWxvZy5vbmNlKCdoaWRkZW4nLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ1JlYWR5IHRvIHNob3cgYW5vdGhlciBkaWFsb2cnKTtcbiAgICAgICAgICAgICAgICBBcHAuZGlhbG9nID0gbmV3IEFwcC5WaWV3cy5EaWFsb2dzW2RpYWxvZ05hbWVdKHBhcmFtcyk7XG4gICAgICAgICAgICB9LCB0aGlzKTtcbiAgICAgICAgICAgIEFwcC5kaWFsb2cuaGlkZSgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgQXBwLmRpYWxvZyA9IG5ldyBBcHAuVmlld3MuRGlhbG9nc1tkaWFsb2dOYW1lXShwYXJhbXMpO1xuICAgICAgICAgICAgQXBwLmxvZy5ldmVudCgnZGlhbG9nJywgJ1Nob3cgRGlhbG9nICcgKyBkaWFsb2dOYW1lKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH0sXG4gICAgc2hvd1BhZ2U6IGZ1bmN0aW9uIChwYWdlTmFtZSwgcGFyYW1zKSB7XG5cbiAgICAgICAgY29uc29sZS5sb2coJ1Nob3dpbmcgcGFnZTogJyArIHBhZ2VOYW1lKTtcblxuICAgICAgICBpZiAoQXBwLmN1cnJlbnRUb3VyKVxuICAgICAgICAgICAgQXBwLmN1cnJlbnRUb3VyLmZpbmlzaCgpO1xuXG4gICAgICAgIGlmICh0eXBlb2YgKHBhcmFtcykgPT09ICd1bmRlZmluZWQnKVxuICAgICAgICAgICAgcGFyYW1zID0ge307XG5cbiAgICAgICAgaWYgKHR5cGVvZiAoQXBwLlZpZXdzLlBhZ2VzW3BhZ2VOYW1lXSkgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiVGhlcmUgaXMgbm8gdmlldyBjbGFzcyBkZWZpbmVkXCIpO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHR5cGVvZiAodGhpcy5wYWdlKSAhPT0gJ3VuZGVmaW5lZCcgJiYgdGhpcy5wYWdlKSAvLy8gdW5kZWxlZ2F0ZSBldmVudHMgZnJvbSBwcmV2aW91cyBwYWdlXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMucGFnZS5zbGVlcCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8vIFRyeWluZyB0byBnZXQgdmlldyBmcm9tIHN0YWNrXG4gICAgICAgIHZhciBmcm9tU3RhY2sgPSB0aGlzLnZpZXdTdGFjay5nZXRWaWV3KHBhZ2VOYW1lLCBwYXJhbXMpO1xuXG5cbiAgICAgICAgaWYgKGZyb21TdGFjayAhPT0gZmFsc2UpIHtcbiAgICAgICAgICAgIC8vLyBDb25zb2xlIGxvZyB3YWtlIHVwIHBhZ2UgZnJvbSBzdGFja1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ1Nob3dpbmcgcGFnZSBmcm9tIHN0YWNrJyk7XG4gICAgICAgICAgICB0aGlzLnBhZ2UgPSBmcm9tU3RhY2s7XG4gICAgICAgICAgICB0aGlzLnBhZ2Uud2FrZVVwKCk7XG4gICAgICAgICAgICB0aGlzLmxvYWRpbmdTdGF0dXMoZmFsc2UpO1xuXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLy8gb3IgY3JlYXRlIG5ldyBvbmVcbiAgICAgICAgICAgIHRoaXMubG9hZGluZ1N0YXR1cyh0cnVlKTtcbiAgICAgICAgICAgIHRoaXMucGFnZSA9IG5ldyBBcHAuVmlld3MuUGFnZXNbcGFnZU5hbWVdKHBhcmFtcyk7XG4gICAgICAgICAgICB0aGlzLnBhZ2Uub24oJ2xvYWRlZCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmxvYWRpbmdTdGF0dXMoZmFsc2UpO1xuICAgICAgICAgICAgfSwgdGhpcyk7XG4gICAgICAgICAgICBpZiAodGhpcy5wYWdlLmlzUmVhZHkpXG4gICAgICAgICAgICAgICAgdGhpcy5sb2FkaW5nU3RhdHVzKGZhbHNlKTtcbiAgICAgICAgICAgIC8vIHRoaXMubGlzdGVuVG8odGhpcy5wYWdlLCAnbG9hZGVkJywgZnVuY3Rpb24oKXsgdGhpcy5sb2FkaW5nU3RhdHVzKGZhbHNlKTsgfSk7XG4gICAgICAgICAgICAvLyB0aGlzLmxpc3RlblRvKHRoaXMucGFnZSwgJ2xvYWRpbmcnLCBmdW5jdGlvbigpeyB0aGlzLmxvYWRpbmdTdGF0dXModHJ1ZSk7IH0pO1xuXG4gICAgICAgICAgICB0aGlzLnZpZXdTdGFjay5hZGRWaWV3KHBhZ2VOYW1lLCBwYXJhbXMsIHRoaXMucGFnZSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5yZW5kZXJMYXlvdXRCbG9ja3MoKTtcblxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9LFxuICAgIHNldFByb2dyZXNzOiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgaWYgKCF0aGlzLnByb2dyZXNzKVxuICAgICAgICAgICAgdGhpcy5wcm9ncmVzcyA9IG5ldyBNcHJvZ3Jlc3MoKTtcblxuICAgICAgICBpZiAodHlwZW9mICh2YWx1ZSkgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5wcm9ncmVzcy5zdGF0dXMgPT09IG51bGwpXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucHJvZ3Jlc3Muc3RhcnQoKTtcbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5wcm9ncmVzcy5pbmMoKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodmFsdWUgPj0gMSB8fCB2YWx1ZSA9PT0gdHJ1ZSlcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnByb2dyZXNzLmVuZCgpO1xuICAgICAgICB0aGlzLnByb2dyZXNzLnNldCh2YWx1ZSk7XG4gICAgfSxcbiAgICBsb2FkaW5nU3RhdHVzOiBmdW5jdGlvbiAoc3RhdHVzKSB7XG4gICAgICAgIGlmIChzdGF0dXMpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdhcHAuanMgfCBMb2FkaW5nIHN0YXR1cyA9IHRydWUnKTtcbiAgICAgICAgICAgIHRoaXMuaXNMb2FkaW5nID0gdHJ1ZTtcbiAgICAgICAgICAgICQoJyNwcmVsb2FkZXInKS5zdG9wKCkuc2hvdygpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ2FwcC5qcyB8IExvYWRpbmcgc3RhdHVzID0gZmFsc2UnKTtcbiAgICAgICAgICAgIHRoaXMuaXNMb2FkaW5nID0gZmFsc2U7XG4gICAgICAgICAgICAkKCcjcHJlbG9hZGVyJykuc3RvcCgpLmZhZGVPdXQoJ3Nsb3cnKTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgc2V0VXNlcjogZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgdGhpcy5jdXJyZW50VXNlciA9IG5ldyBBcHAuTW9kZWxzLlVzZXIoKTtcbiAgICAgICAgdGhpcy5jdXJyZW50VXNlci5vbignc2lnbmVkSW5TdGF0dXNDaGFuZ2VkJywgdGhpcy51c2VyQ2hhbmdlZCwgdGhpcyk7XG4gICAgICAgIGlmICh0eXBlb2YgKGRhdGEpICE9PSAndW5kZWZpbmVkJylcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFVzZXIuc2lnbkluV2l0aERhdGEoZGF0YSk7XG4gICAgfSxcbiAgICB1c2VyQ2hhbmdlZDogZnVuY3Rpb24gKCkge1xuICAgICAgICBjb25zb2xlLmxvZygnVXNlciBpbmZvIGNoYW5nZWQnKTtcbiAgICAgICAgLy8gWW91IGNhbiBhbHNvIHJlZnJlc2ggdGhlIHBhZ2UgaGVyZSBpZiB5b3Ugd2FudCB0by5cblxuICAgICAgICB0aGlzLnJlbmRlckxheW91dEJsb2NrcygpO1xuICAgIH0sXG4gICAgcmVuZGVyTGF5b3V0QmxvY2tzOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciB0aGF0ID0gdGhpcztcblxuICAgICAgICBpZiAoIXRoaXMuaGVhZGVyKSB7XG4gICAgICAgICAgICB0aGlzLmhlYWRlciA9IG5ldyBBcHAuVmlld3MuSGVhZGVyKCk7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgcmVuZGVyRnVuYyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoYXQuaGVhZGVyLnJlbmRlcigpO1xuICAgICAgICB9O1xuXG4gICAgICAgIGlmICgkLmlzUmVhZHkpIHtcbiAgICAgICAgICAgIHJlbmRlckZ1bmMoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJlbmRlckZ1bmMoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfSxcbiAgICBjcmVhdGVDb29raWU6IGZ1bmN0aW9uIChuYW1lLCB2YWx1ZSwgZGF5cykge1xuICAgICAgICB2YXIgZXhwaXJlcztcblxuICAgICAgICBpZiAoZGF5cykge1xuICAgICAgICAgICAgdmFyIGRhdGUgPSBuZXcgRGF0ZSgpO1xuICAgICAgICAgICAgZGF0ZS5zZXRUaW1lKGRhdGUuZ2V0VGltZSgpICsgKGRheXMgKiAyNCAqIDYwICogNjAgKiAxMDAwKSk7XG4gICAgICAgICAgICBleHBpcmVzID0gXCI7IGV4cGlyZXM9XCIgKyBkYXRlLnRvR01UU3RyaW5nKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBleHBpcmVzID0gXCJcIjtcbiAgICAgICAgfVxuICAgICAgICBkb2N1bWVudC5jb29raWUgPSBlbmNvZGVVUklDb21wb25lbnQobmFtZSkgKyBcIj1cIiArIGVuY29kZVVSSUNvbXBvbmVudCh2YWx1ZSkgKyBleHBpcmVzICsgXCI7IHBhdGg9L1wiO1xuICAgIH0sXG4gICAgcmVhZENvb2tpZTogZnVuY3Rpb24gKG5hbWUpIHtcbiAgICAgICAgdmFyIG5hbWVFUSA9IGVuY29kZVVSSUNvbXBvbmVudChuYW1lKSArIFwiPVwiO1xuICAgICAgICB2YXIgY2EgPSBkb2N1bWVudC5jb29raWUuc3BsaXQoJzsnKTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjYS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdmFyIGMgPSBjYVtpXTtcbiAgICAgICAgICAgIHdoaWxlIChjLmNoYXJBdCgwKSA9PT0gJyAnKVxuICAgICAgICAgICAgICAgIGMgPSBjLnN1YnN0cmluZygxLCBjLmxlbmd0aCk7XG4gICAgICAgICAgICBpZiAoYy5pbmRleE9mKG5hbWVFUSkgPT09IDApXG4gICAgICAgICAgICAgICAgcmV0dXJuIGRlY29kZVVSSUNvbXBvbmVudChjLnN1YnN0cmluZyhuYW1lRVEubGVuZ3RoLCBjLmxlbmd0aCkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH0sXG4gICAgZXJhc2VDb29raWU6IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgICAgIEFwcC5jcmVhdGVDb29raWUobmFtZSwgXCJcIiwgLTEpO1xuICAgIH1cblxufTtcblxuXG4vKmRlYnVnKi9cbmZ1bmN0aW9uIGluY2x1ZGVDc3NEZWJ1ZyhlKSB7XG4gICAgdmFyIGV2dG9iaiA9IHdpbmRvdy5ldmVudCA/IGV2ZW50IDogZVxuICAgIGlmIChldnRvYmoua2V5Q29kZSA9PSA5MCAmJiBldnRvYmouY3RybEtleSkge1xuXG4gICAgICAgIHZhciBjc3NJZCA9ICdkZWJ1Zy1ib290c3RyYXAnOyAgLy8geW91IGNvdWxkIGVuY29kZSB0aGUgY3NzIHBhdGggaXRzZWxmIHRvIGdlbmVyYXRlIGlkLi5cbiAgICAgICAgaWYgKCFkb2N1bWVudC5nZXRFbGVtZW50QnlJZChjc3NJZCkpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHZhciBoZWFkID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2hlYWQnKVswXTtcbiAgICAgICAgICAgIHZhciBsaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGluaycpO1xuICAgICAgICAgICAgbGluay5pZCA9IGNzc0lkO1xuICAgICAgICAgICAgbGluay5yZWwgPSAnc3R5bGVzaGVldCc7XG4gICAgICAgICAgICBsaW5rLnR5cGUgPSAndGV4dC9jc3MnO1xuICAgICAgICAgICAgbGluay5ocmVmID0gJ3NyYy9jc3MvYm9vdHN0cmFwLXJlc3BvbnNpdmUtZGVidWcuY3NzJztcbiAgICAgICAgICAgIGxpbmsubWVkaWEgPSAnYWxsJztcbiAgICAgICAgICAgIGhlYWQuYXBwZW5kQ2hpbGQobGluayk7XG4gICAgICAgIH1cblxuICAgIH1cbn1cblxuZG9jdW1lbnQub25rZXlkb3duID0gaW5jbHVkZUNzc0RlYnVnO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgQXBwID0gcmVxdWlyZSgnLi9hcHAnKTtcblxuLypcbiAqICBJbXBsZXJtZW50aW5nIGJhY2tib25lXG4gKi9cbiQoZnVuY3Rpb24gKCkge1xuICAgIEFwcC5pbml0KCk7XG59KTtcblxuLypkZWJ1ZyovXG5mdW5jdGlvbiBpbmNsdWRlQ3NzRGVidWcoZSkge1xuICAgIHZhciBldnRvYmogPSB3aW5kb3cuZXZlbnQgPyBldmVudCA6IGVcbiAgICBpZiAoZXZ0b2JqLmtleUNvZGUgPT0gOTAgJiYgZXZ0b2JqLmN0cmxLZXkpIHtcblxuICAgICAgICB2YXIgY3NzSWQgPSAnZGVidWctYm9vdHN0cmFwJzsgIC8vIHlvdSBjb3VsZCBlbmNvZGUgdGhlIGNzcyBwYXRoIGl0c2VsZiB0byBnZW5lcmF0ZSBpZC4uXG4gICAgICAgIGlmICghZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoY3NzSWQpKVxuICAgICAgICB7XG4gICAgICAgICAgICB2YXIgaGVhZCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdoZWFkJylbMF07XG4gICAgICAgICAgICB2YXIgbGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpbmsnKTtcbiAgICAgICAgICAgIGxpbmsuaWQgPSBjc3NJZDtcbiAgICAgICAgICAgIGxpbmsucmVsID0gJ3N0eWxlc2hlZXQnO1xuICAgICAgICAgICAgbGluay50eXBlID0gJ3RleHQvY3NzJztcbiAgICAgICAgICAgIGxpbmsuaHJlZiA9ICdzcmMvY3NzL2Jvb3RzdHJhcC1yZXNwb25zaXZlLWRlYnVnLmNzcyc7XG4gICAgICAgICAgICBsaW5rLm1lZGlhID0gJ2FsbCc7XG4gICAgICAgICAgICBoZWFkLmFwcGVuZENoaWxkKGxpbmspO1xuICAgICAgICB9XG5cbiAgICB9XG59XG5cbmRvY3VtZW50Lm9ua2V5ZG93biA9IGluY2x1ZGVDc3NEZWJ1ZztcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
