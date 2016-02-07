'use strict';

var AbstractPage = require('./../../abstract/page');

// page.js
var Page = AbstractPage.extend({
    templateName: 'pages/page',
    category: 'page',
    title: function () {
        return 'Page Title';
    },
    render: function () {
        this.renderHTML({slug: 'hi'});
    },
    initialize: function (params) {
        this.render();
    }

});

module.exports = Page;