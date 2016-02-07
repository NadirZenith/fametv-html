'use strict';

var settings = require('./../settings');

// show.js
var Show = Backbone.Model.extend({
    defaults: {
        title: null,
        thumb: null,
        video: null,
    },
    getTotal: function () {
        // return parseFloat(this.get('total'), 10);
    },
    url: function () {
        return settings.apiEntryPoint + 'shows.php?id=' + this.id;
    },
});

module.exports = Show; 