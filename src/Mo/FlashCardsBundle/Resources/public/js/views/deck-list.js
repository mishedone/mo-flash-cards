/*jslint nomen: true*/
/*global $, _, Backbone, Routing*/

var DeckListView = (function () {
    "use strict";
    
    return Backbone.View.extend({
        template: _.template($('#deck-list').html()),

        render: function () {
            this.$el.html(this.template({
                decks: this.collection
            }));

            return this;
        }
    });
}());