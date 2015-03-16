$(document).ready(function() {
    // load fixtures
    $(document.body).append('<div class="card-player-fixture" style="display: none;">' +
        '<span id="card-player-question"></span>' +
        '<span id="card-player-hint"></span>' +
        '<input type="text" id="card-player-answer">' +
        '<button id="card-player-show-hint"></button>' +
        '</div>');
    
    // define specs
    describe('CardPlayer', function() {
        var player = null;
        
        describe('when created', function() {
            beforeAll(function() {
                player = createCardPlayer('empty');
            });
            it('has no cards', function() {
                expect(player.cards).toEqual([]);
            });
            it('has no current card loaded', function() {
                expect(player.currentIndex).toEqual(null);
            });
            it('knows where questions are shown', function() {
                expect(player.question).toEqual($('#card-player-question'));
            });
            it('knows where answers are typed in', function() {
                expect(player.answer).toEqual($('#card-player-answer'));
            });
            it('knows where hints are shown', function() {
                expect(player.hint).toEqual($('#card-player-hint'));
            });
            it('knows when hints are shown', function() {
                expect(player.showHint).toEqual($('#card-player-show-hint'));
            });
        });
  
        describe('can add a card', function() {
            beforeAll(function() {
                player = createCardPlayer('empty');
            });
            it('based on question and answer', function() {
                player.addCard('bat', 'прилеп');
                expect(player.cards[0].question).toEqual('bat');
                expect(player.cards[0].answer).toEqual('прилеп');
            });
        });
        
        describe('can fetch the correct answer for the current card', function() {
            beforeAll(function() {
                player = createCardPlayer('full');
                player.loadNextCard();
            });
            it('by checking the current card answer', function() {
                expect(player.getCorrectAnswer()).toEqual('котка');
            });
        });
        
        describe('can load the next card', function() {
            beforeEach(function() {
                player = createCardPlayer('full');
            });
            it('by setting it as current', function() {
                player.loadNextCard();
                expect(player.currentIndex).toEqual(0);
            });
            it('by showing it\'s question', function() {
                player.loadNextCard();
                expect(player.question.html()).toEqual('cat');
            });
            it('by removing the previous answer', function() {
                player.answer.val('come on');
                player.loadNextCard();
                expect(player.answer.val()).toEqual('');
            });
            it('by clearing the hint by default', function() {
                player.hint.html('some good old hint');
                player.loadNextCard();
                expect(player.hint.html()).toEqual('');
            });
            it('by not clearing the hint if asked', function() {
                player.hint.html('some good old hint');
                player.loadNextCard(false);
                expect(player.hint.html()).toEqual('some good old hint');
            });
            it('by finishing the player if there are no more left', function() {
                spyOn(player, 'finish');
                for (var i = 0; i <= 3; i++) { 
                    player.loadNextCard();
                }
                expect(player.finish).not.toHaveBeenCalled();
                player.loadNextCard();
                expect(player.finish).toHaveBeenCalled();
            });
        });
        
        describe('can answer the current card', function() {
            beforeEach(function() {
                player = createCardPlayer('full');
                player.loadNextCard();
            });
            it('by loading the next card if correct (even if case does not match)', function() {
                spyOn(player, 'loadNextCard');
                player.answer.val('коТКа');
                player.answerCurrentCard();
                expect(player.loadNextCard).toHaveBeenCalled();
            });
            it('by doing nothing if incorrect', function() {
                spyOn(player, 'loadNextCard');
                player.answer.val('котк');
                player.answerCurrentCard();
                expect(player.loadNextCard).not.toHaveBeenCalled();
            });
        });
        
        describe('can show a hint for the current card', function() {
            it('by showing the correct answer', function() {
                player = createCardPlayer('full');
                player.loadNextCard();
                player.showCurrentCardHint();
                expect(player.hint.html()).toEqual('котка');
            });
        });
        
        describe('can be started', function() {
            beforeAll(function() {
                player = createCardPlayer('full');
                spyOn(player, 'loadNextCard');
                spyOn(player, 'answerCurrentCard');
                spyOn(player, 'showCurrentCardHint');
                player.start();
            });
            it('by loading the first card', function() {
                expect(player.loadNextCard).toHaveBeenCalled();
            });
            it('by watching for a correct answer each time the user types in something', function() {
                player.answer.keyup();
                expect(player.answerCurrentCard).toHaveBeenCalled();
            });
            it('by watching for clicks on the show hint button', function() {
                player.showHint.click();
                expect(player.showCurrentCardHint).toHaveBeenCalled();
            });
        });
        
        describe('can be finished', function() {
            beforeAll(function() {
                player = createCardPlayer('full');
                player.start();
                player.answer.val('great');
                spyOn(player, 'answerCurrentCard');
                spyOn(player, 'showCurrentCardHint');
                player.finish();
            });
            it('by showing the finished message', function() {
                expect(player.question.html()).toEqual('No more cards to learn.');
            });
            it('by removing the last answer', function() {
                expect(player.answer.val()).toEqual('');
            });
            it('by not watching for a correct answer anymore', function() {
                player.answer.keyup();
                expect(player.answerCurrentCard).not.toHaveBeenCalled();
            });
            it('by not watching for clicks on the show hint button anymore', function() {
                player.showHint.click();
                expect(player.showCurrentCardHint).not.toHaveBeenCalled();
            });
        });
    });
});

/**
 * Initialize different versions of a test card player.
 * 
 * @param {string} type Defines the type of player to initialize.
 * @returns {CardPlayer}
 */
function createCardPlayer(type) {
    var player = new CardPlayer(jQuery);
    $('#card-player-question').html('');
    $('#card-player-answer').val('');
    
    // add cards for each available type
    switch (type) {
        case 'full':
            player.addCard('cat', 'котка');
            player.addCard('dog', 'куче');
            player.addCard('rat', 'плъх');
            player.addCard('котка', 'cat');
            break;
    }
    
    return player;
};