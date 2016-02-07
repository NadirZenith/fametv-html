'use strict';

var App = require('./../../../app');
var AbstractPage = require('./../../abstract/page');
var Shows = require('./../../collection/shows');
var Show = require('./../../model/show');
var ShowsList = require('./../parts/showsList');
var ShowItem = require('./../parts/show');

// index.js
var Index = AbstractPage.extend({
    templateName: 'pages/index',
    category: 'home',
    shows: null,
    show: null,
    current_show_id: false,
    player_active: true,
    autoplay: true,
    title: function () {
        var title = 'Homepage'
        if (this.show && this.show.get('title') !== null) {
            title = this.show.get('title');
        }
        return title;
    },
    render: function () {
        this.initializeParts();
        this.renderHTML({});
    },
    domEvents: function () {
        var $window = $(window);
        var $body = $('body');
        var doc = document.documentElement;
        var top = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
        var self = this;
        var $navbar = $(".navbar");

        $(window).on('scroll.index', function () {
            $($('#debug').text(window.pageYOffset));

            if ($navbar.offset().top > 30) {
                /*if ($(".navbar").offset().top > 30) {*/
                self.player_active = false;
                self.trigger('index:browse-list');

            } else {
                self.player_active = true;
                self.trigger('index:reach-top');

            }

            var newTop = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
            if (newTop !== top) {
                $body.removeClass('show-video');
            }

        });
        /*$(window).scroll();*/
        /*
         $('#list').on('click', '.video-list-item', function (e) {
         $body.addClass('show-video');
         top = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
         });
         */

    },
    onVideoEnded: function () {
        if (this.player_active && this.autoplay) {
            this.showNextVideo();
        }
    },
    showNextVideo: function () {
        var model = this.shows.getNext();
        if (model) {
            var Router = require('./../../router');
            Router.navigate('/show/' + model.get('id'), {
                trigger: true
            });
        }

    },
    sleep: function () {
        $(window).off('scroll.index');
        AbstractPage.prototype.sleep.call(this /*, args...*/);
    },
    initialize: function (params) {
        this.renderLoading();
        this.on('render', this.domEvents);

        if (params.id) {
            this.current_show_id = params.id;
        }

        var self = this;
        this.on('index:reach-top', function () {

            $('body').removeClass('show-list');
            $('body').removeClass('show-video');
            if (self.parts.showView) {
                /*self.parts.showView.play();*/
                /*console.log('play', self.show);*/
                /*self.show.play();*/
            }

        });

        this.on('index:browse-list', function () {

            $('body').addClass('show-list');

            /*var Router = require('./../../router');*/
            /*Router.navigate('/');*/

        });



        this.render();

    },
    update: function (params) {
        this.current_show_id = (params.id !== false) ? params.id : false;

        /*$('body').addClass('show-video');*/
        this.trigger('index:reach-top');
        this.player_active = true;
        if (this.current_show_id === false) {
            window.scrollTo(0, 0);
            // renderlast

        } else {

            this.show = this.shows.get(params.id);
            this.parts.showView.renderItem(this.show);

        }

        this.setTitle();

    },
    initializeParts: function () {

        var self = this;
        this.initShowView(function () {
            self.parts.showView.on('show-ended', self.onVideoEnded, self);
        });

        this.initListView(function () {
            if (self.current_show_id === false) {

                self.parts.showView.renderItem(self.shows.getFirst());
                self.parts.showView.on('show-ended', self.onVideoEnded, self);
            }

        });

        this.shows.fetch();

    },
    initShowView: function (callback) {
        var self = this;
        self.show = new Show();
        if (this.current_show_id !== false) {
            self.show.set("id", this.current_show_id);
            this.show.fetch();
        }

        self.parts.showView = new ShowItem({
            model: self.show
        });

        this.show.on('change', function (evt) {
            self.parts.showView.renderItem(self.show);

            if (typeof (callback) === 'function') {
                callback();
            }
        });


    },
    initListView: function (callback) {
        var self = this;

        self.shows = new Shows();
        self.parts.showList = new ShowsList({
            collection: self.shows
        });

        this.shows.on('sync', function (evt) {
            self.parts.showList.render();

            if (typeof (callback) === 'function') {
                callback();
            }

        });

    },
    stopAutoplay: function () {

    }

});

module.exports = Index;
