/*global Backbone, Routing*/

var DeckCollection = Backbone.Collection.extend({
    url: Routing.generate('mofc_api_get_decks')
});