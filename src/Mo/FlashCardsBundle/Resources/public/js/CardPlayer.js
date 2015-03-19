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
    self.historyTemplate = '<dt>{{question}}</dt><dd>{{answer}}</dd>';
    
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
    
    // select controls
    self.question = $('#' + self.questionId);
    self.answer = $('#' + self.answerId);
    self.hint = $('#' + self.hintId);
    self.showHint = $('#' + self.showHintId);
    self.history = $('#' + self.historyId);
}

/**
 * Adds a card to the player.
 * 
 * @param {string} question
 * @param {string} answer
 */
CardPlayer.prototype.addCard = function (question, answer) {
    "use strict";
    this.cards.push({question: question, answer: answer});
};

/**
 * Returns the question of the currently loaded card.
 * 
 * @returns {string}
 */
CardPlayer.prototype.getCurrentQuestion = function () {
    "use strict";
    return this.cards[this.currentIndex].question;
};

/**
 * Returns the answer for the currently loaded card.
 * 
 * @returns {string}
 */
CardPlayer.prototype.getCurrentAnswer = function () {
    "use strict";
    return this.cards[this.currentIndex].answer;
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
        this.question.html(this.getCurrentQuestion());
    } else {
        this.finish();
    }
};

/**
 * Checks if the typed in answer is the same as the current one.
 */
CardPlayer.prototype.answerCurrentCard = function () {
    "use strict";
    if (this.answer.val().toLowerCase() === this.getCurrentAnswer().toLowerCase()) {
        this.addCurrentCardToHistory();
        this.loadNextCard();
    }
};

/**
 * Shows a hint for the currently loaded card.
 */
CardPlayer.prototype.showCurrentCardHint = function () {
    "use strict";
    this.hint.html(this.getCurrentAnswer());
};

/**
 * Fills in the history template with current card data and adds it to the history.
 */
CardPlayer.prototype.addCurrentCardToHistory = function () {
    "use strict";
    var historyElement = this.historyTemplate.replace(
        '{{question}}',
        this.getCurrentQuestion()
    ).replace(
        '{{answer}}',
        this.getCurrentAnswer()
    );
    this.history.prepend(historyElement);
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
};
