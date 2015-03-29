/**
 * The main learning weapon - this player should play the cards to the user so
 * he can learn them.
 * 
 * @param {Object} $       A jQuery instance.
 * @param {Object} options Initialize the player.
 */
function CardPlayer($, options) {
    "use strict";
    var self, key;
    self = this;
    
    // define default options
    self.questionId = 'card-player-question';
    self.answerId = 'card-player-answer';
    self.hintId = 'card-player-hint';
    self.showHintId = 'card-player-show-hint';
    self.historyId = 'card-player-history';
    self.historyTemplate = '<dt>[[question]]</dt><dd>[[answer]]</dd>';
    self.audioClass = 'card-player-audio';
    self.audioAttribute = 'audio-url';
    
    // define messages
    self.finishMessage = 'No more cards to learn.';
    
    // update the options based on the passed JSON
    for (key in options) {
        if (options.hasOwnProperty(key) && self.hasOwnProperty(key)) {
            self[key] = options[key];
        }
    }
    
    // define properties
    self.cards = [];
    self.currentIndex = null;
    self.audioPlayer = document.createElement('audio');
    
    // select controls
    self.$ = $;
    self.container = $('body');
    self.question = $('#' + self.questionId);
    self.answer = $('#' + self.answerId);
    self.hint = $('#' + self.hintId);
    self.showHint = $('#' + self.showHintId);
    self.history = $('#' + self.historyId);
}

/**
 * Adds a card to the player.
 * 
 * @param {Card} card
 */
CardPlayer.prototype.addCard = function (card) {
    "use strict";
    this.cards.push(card);
};

/**
 * Returns the question of the currently loaded card.
 * 
 * @returns {string}
 */
CardPlayer.prototype.getCurrentCard = function () {
    "use strict";
    return this.cards[this.currentIndex];
};

/**
 * Loads the next card into the player.
 */
CardPlayer.prototype.loadNextCard = function () {
    "use strict";
    var nextIndex = this.currentIndex === null ? 0 : this.currentIndex + 1;
    
    // clear hint
    this.hint.html('');
    
    // update conditional properties
    if (typeof this.cards[nextIndex] !== 'undefined') {
        this.currentIndex = nextIndex;
        this.answer.val('');
        this.question.html(this.getCurrentCard().question.output);
    } else {
        this.finish();
    }
};

/**
 * Checks if the typed in answer is the same as the current one.
 */
CardPlayer.prototype.answerCurrentCard = function () {
    "use strict";
    if (this.answer.val().toLowerCase() === this.getCurrentCard().answer.text.toLowerCase()) {
        this.addCurrentCardToHistory();
        this.loadNextCard();
    }
};

/**
 * Shows a hint for the currently loaded card.
 */
CardPlayer.prototype.showCurrentCardHint = function () {
    "use strict";
    this.hint.html(this.getCurrentCard().answer.output);
};

/**
 * Fills in the history template with current card data and adds it to the history.
 */
CardPlayer.prototype.addCurrentCardToHistory = function () {
    "use strict";
    var historyElement = this.historyTemplate.replace(
        '[[question]]',
        this.getCurrentCard().question.output
    ).replace(
        '[[answer]]',
        this.getCurrentCard().answer.output
    );
    this.history.prepend(historyElement);
};

/**
 * Plays audio based on a jQuery selected html element.
 *
 * @param {Object} audio The html element.
 */
CardPlayer.prototype.playAudio = function (audio) {
    "use strict";
    var audioAttribute = audio.attr(this.audioAttribute);
    if (audio.hasClass(this.audioClass)) {
        if (audioAttribute) {
            this.audioPlayer.src = audioAttribute;
            this.audioPlayer.play();
        }
    }
};

/**
 * Starts the player by loading the first card and watching for player typing.
 */
CardPlayer.prototype.start = function () {
    "use strict";
    var player = this;
    
    // run it!
    this.loadNextCard();
    this.answer.keyup(function () {
        player.answerCurrentCard();
    });
    this.showHint.click(function () {
        player.showCurrentCardHint();
    });
    this.container.click(function (event) {
        player.playAudio(player.$(event.target));
    });
};

/**
 * Finishes the playing of cards.
 */
CardPlayer.prototype.finish = function () {
    "use strict";
    this.question.html(this.finishMessage);
    this.answer.val('');
    this.answer.off('keyup');
    this.showHint.off('click');
    this.container.off('click');
};
