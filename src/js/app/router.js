'use strict';

var App = require('./../app');
var settings = require('./settings');

// router.js
var Router = Backbone.Router.extend({
  initialize: function() {
    // App.log('router.initialize');
    // this.listenTo(this, "all", this.index);
  },
  setUrl: function(path) {
    this.navigate(path);
  },
  redirect: function(path) {
    if (typeof(App.page) !== 'undefined' && App.page && typeof(App.page.isReady) !== 'undefined' && !App.page.isReady)
      App.loadingStatus(false);
    this.navigate(path, {
      trigger: true
    });
  },

  routes: {
    "(show/:id)": "index", // #help
    "page/:slug": "page"
      //"show/:id": "show", // #wallets/4
      // "help": "help", // #help
      // "wallets(/)": "wallets", // #wallets
      // "profile(/)": "profile", // #wallets
      // "wallets/:id": "wallet", // #wallets/4
      // "wallets/:id/import(/)": "importXLS", // #wallets/4
      // "user/updatepassword/:code/:hash": "updatePassword"
  },

  dialogs: {
    "user/signin": "Signin",
    "user/registration": "Registration",
    "user/restore": "Restore",
    "user/logout": "Logout",
    "user/fillprofile": "FillProfile",
    "wallets/add": "AddWallet",
    "user/change_language": "ChangeLanguage"
  },

  index: function(id) {
    var id = (!id) ? false : id;
    // App.showSection('Index', {
    App.showPage('Index', {
      id: id,
      hash: false
    });
  },
  page: function(slug) {
    App.showPage('Page', {
      id: slug,
    });
  },

  profile: function() {
    App.showPage('Profile');
  },

  init: function() {

    Backbone.history.start({
      root: settings.rootPath,
      // root: '/fametv-html/index.php',
      pushState: settings.history.pushState,
      silent: settings.history.startSilent
    });


    Backbone.history.isRoutingURL = function(fragment) {
      return true;
      // console.log('-> herer ->', this.handlers);
      for (var k in this.handlers) {
        if (this.handlers[k].route.test(fragment))
          return true;
      }
      return false;
    };

    var that = this;

    if (Backbone.history && Backbone.history._hasPushState) {
      $(document).on("click", "a", function(evt) {
        if (typeof(evt.ctrlKey) !== 'undefined' && evt.ctrlKey) {
          return true;
        }

        var href = $(this).attr("href");
        var protocol = this.protocol + "//";
        href = href.split(settings.sitePath).join('');
        href = href.slice(-1) == '/' ? href.slice(0, -1) : href;
        href = href.slice(0, 1) == '/' ? href.slice(1) : href;

        /// trying to find dialog
        for (var k in that.dialogs) {
          if (k == href) {
            console.log('Showing "' + that.dialogs[k] + '" dialog from document click event');
            App.showDialog(that.dialogs[k]);

            return false;
          }
        }

        // Ensure the protocol is not part of URL, meaning its relative.
        if (href.slice(protocol.length) !== protocol && Backbone.history.isRoutingURL(href)) {
          console.log('Navigating to "' + href + '" from document click event');

          evt.preventDefault();

          that.navigate(href, {
            trigger: true
          });

          return false;
        }

        return true;
      });
    }
  }

});

module.exports = new Router();