/**
 * The main learning weapon - this player should play the cards to the user so
 * he can learn them.
 * 
 * @todo implement error system
 * @todo implement hint system
 * @param {Object} options Initialize the player.
 */
function CardPlayer(options) {
    var self = this;
    
    // define default options
    self.cards = [];
    self.current = null;
    self.currentIndex = null;
    self.questionId = 'card-player-question';
    self.answerId = 'card-player-answer';
    self.checkId = 'card-player-check';
    
    // update the options based on the passed JSON
    for (var key in options) {
        if (self.hasOwnProperty(key)) {
            self[key] = options[key];
        }
    }
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
 * Initializes the player by loading the first card and binding events.
 */
CardPlayer.prototype.initialize = function() {
    var player = this;
    this.loadCard(0);
    $('#' + this.checkId).click(function() {
        player.checkCardAnswer();
    });
};

/**
 * Loads a card into the player by it's index.
 * 
 * @param {int} index Index of the card to load.
 */
CardPlayer.prototype.loadCard = function(index) {
    if (typeof this.cards[index] !== 'undefined') {
        this.current = this.cards[index];
        this.currentIndex = index;
        $('#' + this.questionId).html(this.current.question);
    }
};

/**
 * Tries answering the current card with the answer typed in.
 */
CardPlayer.prototype.checkCardAnswer = function() {
    this.answerCard($('#' + this.answerId).val());
};

/**
 * Checks if an answer is correct.
 * 
 * @param {string} answer
 */
CardPlayer.prototype.answerCard = function(answer) {
    if (answer === this.current.answer) {
        this.loadCard(this.currentIndex + 1);
    }
};