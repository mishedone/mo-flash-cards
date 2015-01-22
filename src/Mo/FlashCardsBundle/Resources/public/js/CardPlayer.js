/**
 * The main learning weapon - this player should play the cards to the user so
 * he can learn them.
 * 
 * @param {Object} options Initialize the player.
 */
function CardPlayer(options) {
    var self = this;
    
    // define default options
    self.questionId = 'card-player-question';
    self.answerId = 'card-player-answer';
    self.hintId = 'card-player-hint';
    self.showHintId = 'card-player-show-hint';
    
    // define messages
    self.finishMessage = 'No more cards to learn.';
    
    // update the options based on the passed JSON
    for (var key in options) {
        if (self.hasOwnProperty(key)) {
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
};

/**
 * Adds a card to the player.
 * 
 * @param {string} question
 * @param {string} answer
 */
CardPlayer.prototype.addCard = function(question, answer) {
    this.cards.push({question: question, answer: answer});
};

/**
 * Returns the correct answer for the currently loaded card.
 * 
 * @returns {string}
 */
CardPlayer.prototype.getCorrectAnswer = function() {
    return this.cards[this.currentIndex].answer;
};

/**
 * Loads the next card into the player.
 * 
 * @param {boolean} clearHint Default: true.
 */
CardPlayer.prototype.loadNextCard = function(clearHint) {
    var nextIndex = this.currentIndex === null ? 0 : this.currentIndex + 1;
    
    // clear hint if asked
    clearHint = typeof clearHint !== 'undefined' ? clearHint : true;
    if (clearHint) {
        this.hint.html('');
    }
    
    // update properties
    if (typeof this.cards[nextIndex] !== 'undefined') {
        this.currentIndex = nextIndex;
        this.answer.val('');
        this.question.html(this.cards[nextIndex].question);
    } else {
        this.finish();
    }
};

/**
 * Checks if the typed in answer is the same as the current question's answer.
 */
CardPlayer.prototype.answerCurrentCard = function() {
    if (this.answer.val() === this.getCorrectAnswer()) {
        this.loadNextCard();
    }
};

/**
 * Shows a hint for the currently loaded card and loads the next one.
 */
CardPlayer.prototype.showCurrentCardHint = function() {
    this.hint.html(this.getCorrectAnswer());
    this.loadNextCard(false);
};

/**
 * Starts the player by loading the first card and watching for player typing.
 */
CardPlayer.prototype.start = function() {
    var player = this;
    
    // run it!
    this.loadNextCard();
    this.answer.keyup(function() {
        player.answerCurrentCard();
    });
    this.showHint.click(function() {
        player.showCurrentCardHint();
    });
};

/**
 * Finishes the playing of cards.
 */
CardPlayer.prototype.finish = function() {
    this.question.html(this.finishMessage);
    this.answer.val('');
};
