/*global $, CardPlayer, createCardPlayer */
/*global describe, it, expect, spyOn */
/*global beforeAll, beforeEach */

(function () {
    "use strict";
    $(document).ready(function () {
        // load fixtures
        $(document.body).append('<div class="card-player-fixture" style="display: none;">' +
            '<button id="card-player-play-question"></button>' +
            '<span id="card-player-question"></span>' +
            '<span id="card-player-hint"></span>' +
            '<input type="text" id="card-player-answer">' +
            '<button id="card-player-show-hint"></button>' +
            '<div id="card-player-history"></div>' +
            '</div>');

        // define specs
        describe('CardPlayer', function () {
            var player = null;

            describe('when created', function () {
                beforeAll(function () {
                    player = createCardPlayer('empty');
                });
                it('has no cards', function () {
                    expect(player.cards).toEqual([]);
                });
                it('has no current card loaded', function () {
                    expect(player.currentIndex).toEqual(null);
                });
                it('knows where questions are shown', function () {
                    expect(player.question).toEqual($('#card-player-question'));
                });
                it('knows where answers are typed in', function () {
                    expect(player.answer).toEqual($('#card-player-answer'));
                });
                it('knows where hints are shown', function () {
                    expect(player.hint).toEqual($('#card-player-hint'));
                });
                it('knows where card history is shown', function () {
                    expect(player.history).toEqual($('#card-player-history'));
                });
                it('knows when hints are shown', function () {
                    expect(player.showHint).toEqual($('#card-player-show-hint'));
                });
                it('knows when questions are played as audio', function () {
                    expect(player.playQuestion).toEqual($('#card-player-play-question'));
                });
                it('knows how card history is filled in', function () {
                    expect(player.historyTemplate).toEqual('{{question}}:{{answer}}<br>');
                });
                it('knows how to play audio', function () {
                    expect(player.audio.tagName.toLowerCase()).toEqual('audio');
                });
            });

            describe('can add a card', function () {
                beforeEach(function () {
                    player = createCardPlayer('empty');
                });
                it('based on question, answer and audio', function () {
                    player.addCard('bat', 'прилеп', '/resource/text-to-speech/bat');
                    expect(player.cards[0].question).toEqual('bat');
                    expect(player.cards[0].answer).toEqual('прилеп');
                    expect(player.cards[0].audio).toEqual('/resource/text-to-speech/bat');
                });
            });
            
            describe('can fetch the question of the current card', function () {
                it('by checking it', function () {
                    player = createCardPlayer('full');
                    player.loadNextCard();
                    expect(player.getCurrentQuestion()).toEqual('cat');
                });
            });

            describe('can fetch the answer of the current card', function () {
                it('by checking it', function () {
                    player = createCardPlayer('full');
                    player.loadNextCard();
                    expect(player.getCurrentAnswer()).toEqual('котка');
                });
            });
            
            describe('can fetch the audio of the current card', function () {
                it('by checking it', function () {
                    player = createCardPlayer('full');
                    player.loadNextCard();
                    expect(player.getCurrentAudio()).toEqual('/resource/text-to-speech/cat');
                });
            });

            describe('can load the next card', function () {
                beforeEach(function () {
                    player = createCardPlayer('full');
                });
                it('by setting it as current', function () {
                    player.loadNextCard();
                    expect(player.currentIndex).toEqual(0);
                });
                it('by showing it\'s question', function () {
                    player.loadNextCard();
                    expect(player.question.html()).toEqual('cat');
                });
                it('by removing the previous answer', function () {
                    player.answer.val('come on');
                    player.loadNextCard();
                    expect(player.answer.val()).toEqual('');
                });
                it('by clearing the hint', function () {
                    player.hint.html('some good old hint');
                    player.loadNextCard();
                    expect(player.hint.html()).toEqual('');
                });
                it('by finishing the player if there are no more left', function () {
                    var i = 1;
                    spyOn(player, 'finish');
                    for (i; i <= 4; i += 1) {
                        player.loadNextCard();
                    }
                    expect(player.finish).not.toHaveBeenCalled();
                    player.loadNextCard();
                    expect(player.finish).toHaveBeenCalled();
                });
            });

            describe('can answer the current card (no matter in what letter case)', function () {
                beforeEach(function () {
                    player = createCardPlayer('full');
                    player.loadNextCard();
                    spyOn(player, 'addCurrentCardToHistory');
                    spyOn(player, 'loadNextCard');
                });
                it('by adding the current card to history if correct', function () {
                    player.answer.val('коТКа');
                    player.answerCurrentCard();
                    expect(player.addCurrentCardToHistory).toHaveBeenCalled();
                });
                it('by loading the next card if correct', function () {
                    player.answer.val('коТКа');
                    player.answerCurrentCard();
                    expect(player.loadNextCard).toHaveBeenCalled();
                });
                it('by doing nothing if incorrect', function () {
                    player.answer.val('котк');
                    player.answerCurrentCard();
                    expect(player.addCurrentCardToHistory).not.toHaveBeenCalled();
                    expect(player.loadNextCard).not.toHaveBeenCalled();
                });
            });

            describe('can show a hint for the current card', function () {
                it('by showing it\'s answer', function () {
                    player = createCardPlayer('full');
                    player.loadNextCard();
                    player.showCurrentCardHint();
                    expect(player.hint.html()).toEqual('котка');
                });
            });
            
            describe('can pronounce the current card question', function () {
                beforeAll(function () {
                    player = createCardPlayer('full');
                    spyOn(player.audio, 'play');
                });
                it('by loading it\'s audio', function () {
                    player.loadNextCard();
                    player.playCurrentCardAudio();
                    expect(player.audio.src).toContain('/resource/text-to-speech/cat');
                    expect(player.audio.play).toHaveBeenCalled();
                });
            });

            describe('can add the current card to history', function () {
                beforeAll(function () {
                    player = createCardPlayer('full');
                });
                beforeEach(function () {
                    player.loadNextCard();
                    player.addCurrentCardToHistory();
                });
                it('by adding a template to history', function () {
                    expect(player.history.html()).toEqual('cat:котка<br>');
                });
                it('by prepending consecutive templates to history', function () {
                    expect(player.history.html()).toEqual('dog:куче<br>cat:котка<br>');
                });
            });

            describe('can be started', function () {
                beforeAll(function () {
                    player = createCardPlayer('full');
                    spyOn(player, 'loadNextCard');
                    spyOn(player, 'answerCurrentCard');
                    spyOn(player, 'showCurrentCardHint');
                    spyOn(player, 'playCurrentCardAudio');
                    player.start();
                });
                it('by loading the first card', function () {
                    expect(player.loadNextCard).toHaveBeenCalled();
                });
                it('by watching for a correct answer each time the user types in something', function () {
                    player.answer.keyup();
                    expect(player.answerCurrentCard).toHaveBeenCalled();
                });
                it('by watching for clicks on the show hint button', function () {
                    player.showHint.click();
                    expect(player.showCurrentCardHint).toHaveBeenCalled();
                });
                it('by watching for clicks on the play question button', function () {
                    player.playQuestion.click();
                    expect(player.playCurrentCardAudio).toHaveBeenCalled();
                });
            });

            describe('can be finished', function () {
                beforeAll(function () {
                    player = createCardPlayer('full');
                    player.start();
                    player.answer.val('great');
                    spyOn(player, 'answerCurrentCard');
                    spyOn(player, 'showCurrentCardHint');
                    player.finish();
                });
                it('by showing the finished message', function () {
                    expect(player.question.html()).toEqual('No more cards to learn.');
                });
                it('by removing the last answer', function () {
                    expect(player.answer.val()).toEqual('');
                });
                it('by not watching for a correct answer anymore', function () {
                    player.answer.keyup();
                    expect(player.answerCurrentCard).not.toHaveBeenCalled();
                });
                it('by not watching for clicks on the show hint button anymore', function () {
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
        var player = new CardPlayer($, {
            'historyTemplate': '{{question}}:{{answer}}<br>'
        });
        $('#card-player-question').html('');
        $('#card-player-answer').val('');

        // add cards for each available type
        switch (type) {
        case 'full':
            player.addCard('cat', 'котка', '/resource/text-to-speech/cat');
            player.addCard('dog', 'куче', '/resource/text-to-speech/dog');
            player.addCard('rat', 'плъх', '/resource/text-to-speech/rat');
            player.addCard('котка', 'cat', '/resource/text-to-speech/nothing');
            break;
        }

        return player;
    }
}());
