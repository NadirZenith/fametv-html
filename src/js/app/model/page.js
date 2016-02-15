'use strict';

var settings = require('./../settings');

// page.js
var Page = Backbone.Model.extend({
    defaults: {
        title: null,
        thumb: null,
        video: null,
    },
    url: function () {
        //api
        return settings.apiEntryPoint + 'page/pages/' + this.id + '.json';

        //dev
        return settings.apiEntryPoint + 'shows.php?id=' + this.id;
    },
});

module.exports = Page; 