/**
 * The main learning weapon - this player should play the cards to the user so
 * he can learn them.
 * 
 * @todo implement hint system
 * @param {Object} options Initialize the player.
 */
function CardPlayer(options) {
    var self = this;
    
    // define default options
    self.questionId = 'card-player-question';
    self.answerId = 'card-player-answer';
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
 * Loads the next card into the player.
 */
CardPlayer.prototype.loadNextCard = function() {
    var nextIndex = this.currentIndex === null ? 0 : this.currentIndex + 1;
    
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
    var correctAnswer = this.cards[this.currentIndex].answer;
    
    // check if answers match
    if (this.answer.val() === correctAnswer) {
        this.loadNextCard();
    }
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
};

/**
 * Finishes the playing of cards.
 */
CardPlayer.prototype.finish = function() {
    this.question.html(this.finishMessage);
    this.answer.val('');
};
