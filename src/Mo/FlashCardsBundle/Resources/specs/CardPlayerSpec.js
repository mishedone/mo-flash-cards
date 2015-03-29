/*global $, CardPlayer, Card, CardSide, createCardPlayer */
/*global describe, it, expect, spyOn, beforeAll, beforeEach */

(function () {
    "use strict";
    $(document).ready(function () {
        // load fixtures
        $(document.body).append('<div class="card-player-fixture" style="display: none;">' +
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
                it('knows how to select elements', function () {
                    expect(player.$).toEqual($);
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
                it('knows when hints are shown', function () {
                    expect(player.showHint).toEqual($('#card-player-show-hint'));
                });
                it('knows where card history is shown', function () {
                    expect(player.history).toEqual($('#card-player-history'));
                });
                it('knows how card history is filled in', function () {
                    expect(player.historyTemplate).toEqual('[[question]]:[[answer]]<br>');
                });
                it('knows how audio is played', function () {
                    expect(player.audioPlayer.tagName.toLowerCase()).toEqual('audio');
                });
                it('knows which elements play audio', function () {
                    expect(player.container).toEqual($('body'));
                    expect(player.audioClass).toEqual('card-player-audio');
                    expect(player.audioAttribute).toEqual('audio-url');
                });
            });

            describe('can add a card', function () {
                it('based on a card consisting of 2 sides', function () {
                    var question, answer;
                    question = new CardSide('bat', '/resource/text-to-speech/bat');
                    answer = new CardSide('прилеп', '/resource/text-to-speech/прилеп');
                    player = createCardPlayer('empty');
                    player.addCard(new Card(question, answer));
                    expect(player.cards[0].question).toEqual(question);
                    expect(player.cards[0].answer).toEqual(answer);
                });
            });
            
            describe('can fetch the current card', function () {
                it('by checking it', function () {
                    player = createCardPlayer('full');
                    player.loadNextCard();
                    expect(player.getCurrentCard()).toEqual(player.cards[0]);
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
                    expect(player.question.html()).toEqual('cat<a class="card-player-audio" audio-url="/cat">play</a>');
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
                it('by finishing the player if there are no more cards left', function () {
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
                    expect(player.hint.html()).toEqual('котка<a class="card-player-audio" audio-url="/котка">play</a>');
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
                    var html = 'cat<a class="card-player-audio" audio-url="/cat">play</a>:' +
                        'котка<a class="card-player-audio" audio-url="/котка">play</a><br>';
                    expect(player.history.html()).toEqual(html);
                });
                it('by prepending consecutive templates to history', function () {
                    var html = 'dog<a class="card-player-audio" audio-url="/dog">play</a>:' +
                        'куче<a class="card-player-audio" audio-url="/куче">play</a><br>' +
                        'cat<a class="card-player-audio" audio-url="/cat">play</a>:' +
                        'котка<a class="card-player-audio" audio-url="/котка">play</a><br>';
                    expect(player.history.html()).toEqual(html);
                });
            });

            describe('can pronounce text', function () {
                var audio;
                
                beforeAll(function () {
                    player = createCardPlayer('full');
                    player.loadNextCard();
                    audio = $('.card-player-audio').first();
                });
                beforeEach(function () {
                    spyOn(player.audioPlayer, 'setAttribute');
                    spyOn(player.audioPlayer, 'play');
                });
                it('by loading it from an html element', function () {
                    player.playAudio(audio);
                    expect(player.audioPlayer.src).toContain('/cat');
                    expect(player.audioPlayer.play).toHaveBeenCalled();
                });
                it('by doing nothing if the element is missing audio class', function () {
                    audio.removeClass('card-player-audio');
                    player.playAudio(audio);
                    expect(player.audioPlayer.play).not.toHaveBeenCalled();
                    audio.addClass('card-player-audio');
                });
                it('by doing nothing if there is no audio url', function () {
                    audio.attr('audio-url', '');
                    player.playAudio(audio);
                    expect(player.audioPlayer.play).not.toHaveBeenCalled();
                    audio.attr('audio-url', '/cat');
                });
            });

            describe('can be started', function () {
                beforeAll(function () {
                    player = createCardPlayer('full');
                    spyOn(player, 'loadNextCard');
                    spyOn(player, 'answerCurrentCard');
                    spyOn(player, 'showCurrentCardHint');
                    spyOn(player, 'playAudio');
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
                it('by watching for clicks on play audio buttons', function () {
                    $('.' + player.audioClass).click();
                    expect(player.playAudio).toHaveBeenCalled();
                });
            });

            describe('can be finished', function () {
                beforeAll(function () {
                    player = createCardPlayer('full');
                    player.start();
                    player.answer.val('great');
                    spyOn(player, 'answerCurrentCard');
                    spyOn(player, 'showCurrentCardHint');
                    spyOn(player, 'playAudio');
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
                it('by not watching for clicks on the play audio buttons anymore', function () {
                    $('.' + player.audioClass).click();
                    expect(player.playAudio).not.toHaveBeenCalled();
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
        var template, player;
        template = {
            outputTemplate: '[[text]]<a class="card-player-audio" audio-url="[[audio]]">play</a>'
        };
        player = new CardPlayer($, {
            historyTemplate: '[[question]]:[[answer]]<br>'
        });
        $('#card-player-question').html('');
        $('#card-player-answer').val('');

        // add cards for each available type
        switch (type) {
        case 'full':
            player.addCard(new Card(
                new CardSide('cat', '/cat', template),
                new CardSide('котка', '/котка', template)
            ));
            player.addCard(new Card(
                new CardSide('dog', '/dog', template),
                new CardSide('куче', '/куче', template)
            ));
            player.addCard(new Card(
                new CardSide('rat', '/rat', template),
                new CardSide('плъх', '/плъх', template)
            ));
            player.addCard(new Card(
                new CardSide('котка', '/котка', template),
                new CardSide('cat', '/cat', template)
            ));
            break;
        }

        return player;
    }
}());
