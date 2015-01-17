$(document).ready(function() {
    // load fixtures
    $(document.body).append('<div class="card-player-fixture" style="display: none;">' +
        '<span id="card-player-question"></span>' +
        '<input type="text" id="card-player-answer">' +
        '<a id="card-player-check">Check it!</a>' +
        '</div>');
    
    // define specs
    describe('CardPlayer', function() {
        var player = createCardPlayer('empty'),
            question = $('#card-player-question'),
            answer = $('#card-player-answer'),
            check = $('#card-player-check');
        
        describe('when created', function() {
            it('has no cards', function() {
                expect(player.cards).toEqual([]);
            });
            it('knows where to ask questions', function() {
                expect(player.questionId).toEqual('card-player-question');
            });
            it('knows where answers are typed in', function() {
                expect(player.answerId).toEqual('card-player-answer');
            });
            it('knows how to check an answer', function() {
                expect(player.checkId).toEqual('card-player-check');
            });
            it('knows the current card index', function() {
                expect(player.currentIndex).toEqual(null);
            });
        });
  
        describe('can add a card', function() {
            it('by providing question and answer', function() {
                player.addCard('bat', 'прилеп');
                expect(player.cards[0].question).toEqual('bat');
                expect(player.cards[0].answer).toEqual('прилеп');
            });
        });
        
        describe('can be initialized', function() {
            beforeAll(function() {
                spyOn(player, 'loadCard');
                spyOn(player, 'checkCardAnswer');
                player.initialize();
            });
            it('by loading the first card', function() {
                expect(player.loadCard).toHaveBeenCalledWith(0);
            });
            it('by binding an event watching for card answers', function() {
                check.click();
                expect(player.checkCardAnswer).toHaveBeenCalled();
            });
        });
        
        describe('can load a card', function() {
            beforeEach(function() {
                player = createCardPlayer('full');
            });
            it('by setting it as current', function() {
                player.loadCard(2);
                expect(player.current).toEqual({question: 'rat', answer: 'плъх'});
                expect(player.currentIndex).toEqual(2);
            });
            it('by showing it\'s question', function() {
                player.loadCard(2);
                expect(question.html()).toEqual('rat');
            });
            it('only when the index exists', function() {
                player.loadCard(22);
                expect(player.current).toBeNull();
                expect(question.html()).toEqual('');
            });
        });
        
        describe('can check card answers', function() {
            it('by comparing them to the real ones', function() {
                answer.val('kitty');
                spyOn(player, 'answerCard');
                player.checkCardAnswer();
                expect(player.answerCard).toHaveBeenCalledWith('kitty');
            });
        });
        
        describe('can answer a card', function() {
            beforeEach(function() {
                player = createCardPlayer('full');
                player.loadCard(1);
            });
            it('by loading the next card if correct', function() {
                spyOn(player, 'loadCard');
                player.answerCard('куче');
                expect(player.loadCard).toHaveBeenCalledWith(2);
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
    var player = new CardPlayer();
    $('#' + player.questionId).html('');
    
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