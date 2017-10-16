/*jslint nomen: true*/
/*global $, _, Backbone, Routing, Messages*/

var DeckLearnView = (function () {
    "use strict";
    
    return Backbone.View.extend({
        template: _.template($('#deck-learn').html()),
        cardSideTemplate: _.template($('#card-side').html()),
        historyRowTemplate: _.template($('#history-row').html()),

        data: {
            cards: [],
            current: null,
            audio: null,
            frontToBack: true
        },

        elements: {
            question: {},
            answer: {},
            hint: {},
            showHint: {},
            history: {}
        },

        initialize: function (options) {
            this.data.audio = document.createElement('audio');
            this.data.frontToBack = options.frontToBack;
        },

        render: function () {
            this.$el.html(this.template({
                deck: this.model
            }));
            this.start();

            return this;
        },

        getCurrentCard: function () {
            return this.data.cards[this.data.current];
        },

        getCurrentCardQuestion: function () {
            if (this.data.frontToBack) {
                return this.getCurrentCard().front;
            } else {
                return this.getCurrentCard().back;
            }
        },

        getCurrentCardAnswer: function () {
            if (this.data.frontToBack) {
                return this.getCurrentCard().back;
            } else {
                return this.getCurrentCard().front;
            }
        },

        getCardSideTemplate: function (text) {
            return this.cardSideTemplate({
                text: text,
                audioUrl: Routing.generate('mofc_api_get_tts', {text: text})
            });
        },

        loadNextCard: function () {
            var next = (this.data.current === null) ? 0 : this.data.current + 1;

            // clear hint
            this.elements.hint.html('');

            // update conditional properties
            if (typeof this.data.cards[next] !== 'undefined') {
                this.data.current = next;
                this.elements.answer.val('');
                this.elements.question.html(this.getCardSideTemplate(
                    this.getCurrentCardQuestion()
                ));
            } else {
                this.finish();
            }
        },

        answerCurrentCard: function () {
            if (this.elements.answer.val().toLowerCase() === this.getCurrentCardAnswer().toLowerCase()) {
                this.addCurrentCardToHistory();
                this.loadNextCard();
            }
        },

        showCurrentCardHint: function () {
            this.elements.hint.html(this.getCardSideTemplate(
                this.getCurrentCardAnswer()
            ));
        },

        addCurrentCardToHistory: function () {
            this.elements.history.prepend(this.historyRowTemplate({
                question: this.getCardSideTemplate(
                    this.getCurrentCardQuestion()
                ),
                answer: this.getCardSideTemplate(
                    this.getCurrentCardAnswer()
                )
            }));
        },

        playAudio: function (element) {
            var url = element.attr('audio-url');
            if (element.hasClass('audio') && url) {
                this.data.audio.src = url;
                this.data.audio.play();
            }
        },

        start: function () {
            var view = this;

            // initialize data
            this.data.current = null;
            this.data.cards = this.model.get('cards');

            // initialize dom elements
            this.elements.question = this.$el.find('#question');
            this.elements.answer = this.$el.find('#answer');
            this.elements.hint = this.$el.find('#hint');
            this.elements.showHint = this.$el.find('#show-hint');
            this.elements.history = this.$el.find('#history');

            // load first card
            this.loadNextCard();

            // bind events
            this.elements.answer.keyup(function () {
                view.answerCurrentCard();
            });
            this.elements.showHint.click(function () {
                view.showCurrentCardHint();
            });
            this.$el.click(function (event) {
                view.playAudio($(event.target));
            });
        },

        finish: function () {
            this.elements.question.html(Messages.deckLearnFinish);
            this.elements.answer.val('');
            this.elements.answer.off('keyup');
            this.elements.showHint.off('click');
        }
    });
}());