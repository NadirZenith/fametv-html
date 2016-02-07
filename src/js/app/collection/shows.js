'use strict';

var settings = require('./../settings');
var Show = require('./../model/show');

// shows.js
var Shows = Backbone.Collection.extend({
    model: Show,
    // parse: function(r) {
    //     console.log('Shows parse ', r);
    //     return r;
    // },
    current: null,
    url: function () {
        return settings.apiEntryPoint + 'shows.php';
    },
    search: function (opts) {
        // var result = this.where(opts);
        // var resultCollection = new App.Collections.Wallets(result);

        // return resultCollection;
    },
    setCurrent: function (item) {
        this.current = item;
        return this.getCurrent();
    },
    getCurrent: function () {
        return this.current;
    },
    getFirst: function () {
        return this.setCurrent(this.first());
    },
    getNext: function () {
        var indexItem = this.at(this.indexOf(this.current) + 1);
        if (typeof (indexItem) !== 'undefined') {
            return this.setCurrent(indexItem);
        }
        return this.getFirst();
    },
    getPrev: function () {
        var indexItem = this.at(this.indexOf(this.current) - 1);
        if (typeof (indexItem) !== 'undefined') {
            return this.setCurrent(indexItem);
        }
        return this.getFirst();
    }
});

module.exports = Shows;