/*global Backbone, Messages*/
/*global DeckModel*/
/*global DeckCollection*/
/*global DeckListView, DeckLearnView*/

var Router = (function () {
    "use strict";
    
    return Backbone.Router.extend({
        routes: {
            'deck/list': 'deckList',
            'deck/learn/:slug(/:direction)': 'deckLearn',
            '': 'deckList'
        },

        deckList: function () {
            var decks, view;
            decks = new DeckCollection();
            view = new DeckListView({
                el: '#content',
                collection: decks
            });

            // set title
            document.title = Messages.deckListMetaTitle;

            // render the deck list
            decks.fetch({
                success: function () {
                    view.render();
                }
            });
        },

        deckLearn: function (slug, direction) {
            var frontToBack, deck, view;
            frontToBack = (direction === 'back-to-front') ? false : true;
            deck = new DeckModel({
                id: slug
            });
            view = new DeckLearnView({
                el: '#content',
                model: deck,
                frontToBack: frontToBack
            });

            // set title
            document.title = Messages.deckLearnMetaTitle.replace('%deck%', slug);

            // render the deck learn environment
            deck.fetch({
                success: function () {
                    view.render();
                }
            });
        }
    });
}());
