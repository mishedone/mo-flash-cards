/*global Backbone*/

var LocaleSwitchView = (function () {
    "use strict";

    return Backbone.View.extend({
        el: '#locale-switch',
        events: {
            'click .locale': 'switchLocale'
        },

        switchLocale: function (event) {
            event.preventDefault();
            window.location.replace(event.target.href + window.location.hash);
        }
    });
}());
