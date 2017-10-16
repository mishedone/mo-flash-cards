/*global Backbone, Routing*/

var DeckModel = Backbone.Model.extend({
    defaults: {
        name: '',
        slug: '',
        cards: []
    },
    urlRoot: Routing.generate('mofc_api_get_decks')
});