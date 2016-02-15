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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsIm1haW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzVLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbnZhciBzZXR0aW5ncyA9IHJlcXVpcmUoJy4vYXBwL3NldHRpbmdzJyk7XG52YXIgdmlld1N0YWNrID0gcmVxdWlyZSgnLi9hcHAvdmlld19zdGFjaycpO1xuLy8gdmFyIExheW91dE1hbmFnZXIgPSByZXF1aXJlKCdiYWNrYm9uZS5sYXlvdXRtYW5hZ2VyJyk7XG4vLyBjb25zb2xlLmxvZyhzZXR0aW5ncyk7XG4vKnZhciBSb3V0ZXIgPSByZXF1aXJlKCcuL2FwcC9yb3V0ZXInKTsqL1xuXG5cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgTW9kZWxzOiB7fSxcbiAgICBDb2xsZWN0aW9uczoge30sXG4gICAgVmlld3M6IHtcbiAgICAgICAgLy8gQWJzdHJhY3Q6IHt9LFxuICAgICAgICAvLyBEaWFsb2dzOiB7fSxcbiAgICAgICAgUGFnZXM6IHtcbiAgICAgICAgICAgIEluZGV4OiByZXF1aXJlKCcuL2FwcC92aWV3L3BhZ2VzL2luZGV4JyksXG4gICAgICAgICAgICBQYWdlOiByZXF1aXJlKCcuL2FwcC92aWV3L3BhZ2VzL3BhZ2UnKVxuICAgICAgICB9LFxuICAgICAgICAvLyBXaWRnZXRzOiB7fSxcbiAgICAgICAgUGFydHM6IHtcbiAgICAgICAgICAgIEhlYWRlcjogcmVxdWlyZSgnLi9hcHAvdmlldy9oZWFkZXInKVxuICAgICAgICB9LFxuICAgICAgICAvLyBDaGFydHM6IHt9XG4gICAgfSxcbiAgICAvKnJvdXRlcjogcmVxdWlyZSgnLi9hcHAvcm91dGVyJyksKi9cbiAgICAvLyBUb3Vyczoge30sXG4gICAgLy8gY3VycmVudFRvdXI6IG51bGwsXG4gICAgLy8gLy9yb3V0ZXI6IG51bGwsXG4gICAgLy8gZGlhbG9nOiBudWxsLFxuICAgIHBhZ2U6IG51bGwsXG4gICAgaGVhZGVyOiBudWxsLFxuICAgIC8vIGZvb3RlcjogbnVsbCxcbiAgICAvLyBzZXR0aW5nczogbnVsbCxcbiAgICAvLyBjdXJyZW50VXNlcjogbnVsbCxcbiAgICBpbml0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICAgICAgJC5hamF4U2V0dXAoe1xuICAgICAgICAgICAgY2FjaGU6IGZhbHNlXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHZhciBkb25lQ2FsbGJhY2sgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgcm91dGVyID0gcmVxdWlyZSgnLi9hcHAvcm91dGVyJyk7XG5cbiAgICAgICAgICAgIHJvdXRlci5pbml0KCk7XG4gICAgICAgICAgICB0aGF0LmxvYWRpbmdTdGF0dXMoZmFsc2UpO1xuICAgICAgICB9O1xuICAgICAgICBkb25lQ2FsbGJhY2soKTtcblxuICAgIH0sXG4gICAgc2hvd1BhZ2U6IGZ1bmN0aW9uIChwYWdlTmFtZSwgcGFyYW1zKSB7XG4gICAgICAgIGlmICh0eXBlb2YgKHRoaXMuVmlld3MuUGFnZXNbcGFnZU5hbWVdKSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJUaGVyZSBpcyBubyB2aWV3IGNsYXNzIGRlZmluZWRcIik7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnJlbmRlckxheW91dEJsb2NrcygpO1xuXG4gICAgICAgIGNvbnNvbGUuZ3JvdXAoJyVjLSBTaG93aW5nIHBhZ2U6ICVzIC0nLCAnYmFja2dyb3VuZDogIzIyMjsgY29sb3I6ICNiYWRhNTUnLCBwYWdlTmFtZSk7XG4gICAgICAgIC8vIGlmIChBcHAuY3VycmVudFRvdXIpXG4gICAgICAgIC8vIEFwcC5jdXJyZW50VG91ci5maW5pc2goKTtcblxuICAgICAgICBpZiAodHlwZW9mIChwYXJhbXMpID09PSAndW5kZWZpbmVkJylcbiAgICAgICAgICAgIHBhcmFtcyA9IHt9O1xuXG4gICAgICAgIHZhciBfaGFzaCA9IHRydWU7XG4gICAgICAgIGlmICh0eXBlb2YgKHBhcmFtcy5oYXNoKSAhPT0gJ3VuZGVmaW5lZCcgJiYgIXBhcmFtcy5oYXNoKSB7XG4gICAgICAgICAgICBfaGFzaCA9IGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8vIFRyeWluZyB0byBnZXQgdmlldyBmcm9tIHN0YWNrXG4gICAgICAgIHZhciBmcm9tU3RhY2sgPSB2aWV3U3RhY2suZ2V0VmlldyhwYWdlTmFtZSwgcGFyYW1zLCBfaGFzaCk7XG5cbiAgICAgICAgLy8gaWYgc2FtZSB2aWV3IGp1c3QgdXBkYXRlXG4gICAgICAgIGlmICh0eXBlb2YgKHRoaXMucGFnZSkgIT09ICd1bmRlZmluZWQnICYmIGZyb21TdGFjaykge1xuICAgICAgICAgICAgaWYgKHRoaXMucGFnZS5jaWQgPT09IGZyb21TdGFjay5jaWQpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnVXBkYXRpbmcgY3VycmVudCB2aWV3ICVzJywgcGFnZU5hbWUpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZ3JvdXBFbmQoKTtcblxuICAgICAgICAgICAgICAgIHRoaXMucGFnZS51cGRhdGUocGFyYW1zKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHVuZGVsZWdhdGUgZXZlbnRzIGZyb20gcHJldmlvdXMgcGFnZVxuICAgICAgICBpZiAodHlwZW9mICh0aGlzLnBhZ2UpICE9PSAndW5kZWZpbmVkJyAmJiB0aGlzLnBhZ2UpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdzbGVlcCBhcHAuanMnLCB0aGlzLnBhZ2UucGFydHMpO1xuICAgICAgICAgICAgdGhpcy5wYWdlLnNsZWVwKCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZnJvbVN0YWNrICE9PSBmYWxzZSkge1xuICAgICAgICAgICAgLy8vIENvbnNvbGUgbG9nIHdha2UgdXAgcGFnZSBmcm9tIHN0YWNrXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnU2hvd2luZyBwYWdlIGZyb20gc3RhY2snKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgdGhpcy5wYWdlID0gZnJvbVN0YWNrO1xuICAgICAgICAgICAgdGhpcy5wYWdlLndha2VVcCgpO1xuICAgICAgICAgICAgdGhpcy5sb2FkaW5nU3RhdHVzKGZhbHNlKTtcblxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8vIG9yIGNyZWF0ZSBuZXcgb25lXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnQ3JlYXRpbmcgbmV3IHBhZ2UnKTtcblxuICAgICAgICAgICAgdGhpcy5sb2FkaW5nU3RhdHVzKHRydWUpO1xuICAgICAgICAgICAgdGhpcy5wYWdlID0gbmV3IHRoaXMuVmlld3MuUGFnZXNbcGFnZU5hbWVdKHBhcmFtcyk7XG4gICAgICAgICAgICB0aGlzLnBhZ2Uub24oJ2xvYWRlZCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmxvYWRpbmdTdGF0dXMoZmFsc2UpO1xuICAgICAgICAgICAgfSwgdGhpcyk7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLnBhZ2UuaXNSZWFkeSlcbiAgICAgICAgICAgICAgICB0aGlzLmxvYWRpbmdTdGF0dXMoZmFsc2UpO1xuXG4gICAgICAgICAgICB2aWV3U3RhY2suYWRkVmlldyhwYWdlTmFtZSwgcGFyYW1zLCB0aGlzLnBhZ2UsIF9oYXNoKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zb2xlLmdyb3VwRW5kKCk7XG5cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSxcbiAgICBzZXRQcm9ncmVzczogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIGlmICghdGhpcy5wcm9ncmVzcylcbiAgICAgICAgICAgIHRoaXMucHJvZ3Jlc3MgPSBuZXcgTXByb2dyZXNzKCk7XG5cbiAgICAgICAgaWYgKHR5cGVvZiAodmFsdWUpID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgaWYgKHRoaXMucHJvZ3Jlc3Muc3RhdHVzID09PSBudWxsKVxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnByb2dyZXNzLnN0YXJ0KCk7XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucHJvZ3Jlc3MuaW5jKCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHZhbHVlID49IDEgfHwgdmFsdWUgPT09IHRydWUpXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wcm9ncmVzcy5lbmQoKTtcblxuICAgICAgICB0aGlzLnByb2dyZXNzLnNldCh2YWx1ZSk7XG4gICAgfSxcbiAgICBsb2FkaW5nU3RhdHVzOiBmdW5jdGlvbiAoc3RhdHVzKSB7XG4gICAgICAgIGlmIChzdGF0dXMpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdhcHAuanMgfCBMb2FkaW5nIHN0YXR1cyA9IHRydWUnKTtcbiAgICAgICAgICAgIHRoaXMuaXNMb2FkaW5nID0gdHJ1ZTtcbiAgICAgICAgICAgIC8vICQoJ2h0bWwnKS5hbmltYXRlKHtcbiAgICAgICAgICAgIC8vICAgICBvcGFjaXR5OiAwXG4gICAgICAgICAgICAvLyB9LCAxMDAwKTtcbiAgICAgICAgICAgICQoJyNwcmVsb2FkZXInKS5zdG9wKCkuc2hvdygpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ2FwcC5qcyB8IExvYWRpbmcgc3RhdHVzID0gZmFsc2UnKTtcbiAgICAgICAgICAgIHRoaXMuaXNMb2FkaW5nID0gZmFsc2U7XG4gICAgICAgICAgICAkKCdodG1sJykuYW5pbWF0ZSh7XG4gICAgICAgICAgICAgICAgb3BhY2l0eTogMVxuICAgICAgICAgICAgfSwgMTAwMCk7XG4gICAgICAgICAgICAkKCcjcHJlbG9hZGVyJykuc3RvcCgpLmZhZGVPdXQoJ3Nsb3cnKTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgcmVuZGVyTGF5b3V0QmxvY2tzOiBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgaWYgKHRoaXMuaGVhZGVyKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgaGVhZGVyID0gcmVxdWlyZSgnLi9hcHAvdmlldy9oZWFkZXInKTtcbiAgICAgICAgdGhpcy5oZWFkZXIgPSBuZXcgaGVhZGVyKCk7XG5cbiAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgICAgICB2YXIgcmVuZGVyRnVuYyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoYXQuaGVhZGVyLnJlbmRlcigpO1xuICAgICAgICB9O1xuXG4gICAgICAgIGlmICgkLmlzUmVhZHkpIHtcbiAgICAgICAgICAgIHJlbmRlckZ1bmMoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJlbmRlckZ1bmMoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfSxcbn07IiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgQXBwID0gcmVxdWlyZSgnLi9hcHAnKTtcblxuLypcbiAqICBJbXBsZXJtZW50aW5nIGJhY2tib25lXG4gKi9cbiQoZnVuY3Rpb24gKCkge1xuICAgIEFwcC5pbml0KCk7XG59KTtcblxuLypkZWJ1ZyovXG5mdW5jdGlvbiBpbmNsdWRlQ3NzRGVidWcoZSkge1xuICAgIHZhciBldnRvYmogPSB3aW5kb3cuZXZlbnQgPyBldmVudCA6IGVcbiAgICBpZiAoZXZ0b2JqLmtleUNvZGUgPT0gOTAgJiYgZXZ0b2JqLmN0cmxLZXkpIHtcblxuICAgICAgICB2YXIgY3NzSWQgPSAnZGVidWctYm9vdHN0cmFwJzsgIC8vIHlvdSBjb3VsZCBlbmNvZGUgdGhlIGNzcyBwYXRoIGl0c2VsZiB0byBnZW5lcmF0ZSBpZC4uXG4gICAgICAgIGlmICghZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoY3NzSWQpKVxuICAgICAgICB7XG4gICAgICAgICAgICB2YXIgaGVhZCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdoZWFkJylbMF07XG4gICAgICAgICAgICB2YXIgbGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpbmsnKTtcbiAgICAgICAgICAgIGxpbmsuaWQgPSBjc3NJZDtcbiAgICAgICAgICAgIGxpbmsucmVsID0gJ3N0eWxlc2hlZXQnO1xuICAgICAgICAgICAgbGluay50eXBlID0gJ3RleHQvY3NzJztcbiAgICAgICAgICAgIGxpbmsuaHJlZiA9ICdzcmMvY3NzL2Jvb3RzdHJhcC1yZXNwb25zaXZlLWRlYnVnLmNzcyc7XG4gICAgICAgICAgICBsaW5rLm1lZGlhID0gJ2FsbCc7XG4gICAgICAgICAgICBoZWFkLmFwcGVuZENoaWxkKGxpbmspO1xuICAgICAgICB9XG5cbiAgICB9XG59XG5cbmRvY3VtZW50Lm9ua2V5ZG93biA9IGluY2x1ZGVDc3NEZWJ1ZztcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
