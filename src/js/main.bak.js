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
