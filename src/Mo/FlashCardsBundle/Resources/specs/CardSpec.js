/*global $, Card, CardSide */
/*global describe, it, expect, spyOn, beforeAll, beforeEach */

(function () {
    "use strict";
    $(document).ready(function () {
        
        // define specs
        describe('Card', function () {
            var front, back, card;
            front = new CardSide('cat', '/cat-audio');
            back = new CardSide('котка', '/котка-аудио');
            card = new Card(front, back);
            
            describe('when created', function () {
                it('has question side', function () {
                    expect(card.question).toEqual(front);
                });
                it('has answer side', function () {
                    expect(card.answer).toEqual(back);
                });
            });
        });
    });
}());