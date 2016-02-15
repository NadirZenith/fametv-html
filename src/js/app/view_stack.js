'use strict';

var settings = require('./settings');
// view_stack.js
var viewStack = {
    stack: {},
    inStackCount: 0,
    addView: function (name, params, view, full_hash) {
        if (!settings.enablePagesStack)
            return false;

        var hash = name;
        if (full_hash) {

            if (typeof (params) !== 'undefined') {

                for (var k in params) {
                    if (typeof (params[k].id) !== 'undefined')
                        hash += '-' + k + '_id' + params[k].id;
                    else
                        hash += '-' + k + '_' + params[k];
                }
            }
        }

        console.log('addView | hash: %s', hash);
        this.stack[hash] = {
            view: view,
            hash: hash,
            added: new Date()
        };
        this.inStackCount++;
        this.removeOldestIfNeeded();
        return true;
    },
    getView: function (name, params, full_hash) {
        if (!settings.enablePagesStack)
            return false;

        var hash = name;
        if (full_hash) {

            if (typeof (params) !== 'undefined') {
                for (var k in params) {
                    if (typeof (params[k].id) !== 'undefined')
                        hash += '-' + k + '_id' + params[k].id;
                    else
                        hash += '-' + k + '_' + params[k];
                }
            }
        }

        if (typeof (this.stack[hash]) !== 'undefined')
            return this.stack[hash].view;
        else
            return false;
    },
    clear: function () {
        this.stack = {};
        this.inStackCount = 0;
    },
    removeOldestIfNeeded: function () {
        var maxElements = settings.pagesStackMaxLength;

        if (this.inStackCount <= maxElements)
            return;

        var sort = [];
        for (var k in this.stack)
            sort.push({
                hash: this.stack[k].hash,
                added: this.stack[k].added
            });

        sort.sort(function (a, b) {
            return a.added - b.added;
        });
        console.log("Removing " + sort[0].hash + " from pages stack");
        delete this.stack[sort[0].hash];
        this.inStackCount--;
    }
};

module.exports = viewStack;