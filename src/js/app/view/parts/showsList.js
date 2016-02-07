'use strict';

var App = require('./../../../app');
var templateManager = require('./../../template_manager');

var Backbone = require('backbone');

// ShowsList.js
var showsList = Backbone.View.extend({
    templateName: 'parts/showsList',
    el: '#showsList',
    events: {
        "click .video-list-item": "viewItemClick",
        // "click #demo_without_mouse_signup": "demoSignUp"
    },
    viewItemClick: function (e) {
        e.preventDefault();
        // alert('click ' + __filename);
        //App.log.event('show', 'View Show', 'From Homepage');

    },
    render: function () {
        console.log(__filename);
        // console.log(this);
        // throw 'stop';
        this.setElement($('#showsList'));

        // console.log(this)
        // var $el = $('#showsList');
        // $('#showsList').remove();
        // this.$el.remove();

        // $el.remove();
        // console.log($el);

        var data = {
            collection: this.collection
        }

        var self = this;
        templateManager.fetch(this.templateName, data, function (html) {
            self.$el.html(html);
        });



    },
    initialize: function (options) {
        console.log(__filename);

    }

});

module.exports = showsList;
