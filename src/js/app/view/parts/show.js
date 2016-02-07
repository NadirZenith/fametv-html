'use strict';

var App = require('./../../../app');
var templateManager = require('./../../template_manager');

var Backbone = require('backbone');
var videojs = require('video.js');

// ShowsList.js
var show = Backbone.View.extend({
    templateName: 'parts/show',
    userPaused: false,
    events: {
        "click .vjs-play-control": "pauseClick",
        // "click #demo_without_mouse_signup": "demoSignUp"
    },
    pauseClick: function () {
        /*alert('click');*/
        /*this.userPaused = !this.userPaused;*/
    },
    render: function () {
        console.log(__filename);

        this.setElement($('#showItem'));
        this.renderItem(this.model);
    },
    renderItem: function (model) {
        var data = {
            model: model
        };

        this.setElement($('#showItem'));

        /*$('body').addClass('show-video');*/

        var self = this;

        templateManager.fetch(this.templateName, data, function (html) {
            self.$el.html(html);
            var video = self.getPlayer();
            video.on('ended', function () {
                self.trigger('show-ended');
            });

        });
    },
    play: function () {
        var player = this.getPlayer();

        var isPlaying = !player.paused();
        if (isPlaying) {
            return;
        }
        console.log('heheh', this.paused);
        if (this.userPaused) {
            return;
        }

        /*var player = player.paused();*/

        player.play();
    },
    getPlayer: function () {
        var video = videojs(document.getElementById('main-video'));
        return video;

    },
    initialize: function (options) {

    }

});

module.exports = show;
