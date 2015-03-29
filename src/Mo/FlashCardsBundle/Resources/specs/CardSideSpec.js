/*global $, CardSide, createCardSide */
/*global describe, it, expect, spyOn, beforeAll, beforeEach */

(function () {
    "use strict";
    $(document).ready(function () {
        
        // define specs
        describe('CardSide', function () {
            var side = createCardSide();
            
            describe('when created', function () {
                it('has text', function () {
                    expect(side.text).toEqual('question');
                });
                it('has audio', function () {
                    expect(side.audio).toEqual('/path/to/audio-file');
                });
                it('knows how to output the side', function () {
                    expect(side.outputTemplate).toEqual('[[text]]<div class="audio" audio-url="[[audio]]"></div>');
                });
                it('prepares the output', function () {
                    expect(side.output).toEqual('question<div class="audio" audio-url="/path/to/audio-file"></div>');
                });
            });
        });
    });
    
    /**
     * Initialize a test ready card side.
     *
     * @returns {CardSide}
     */
    function createCardSide() {
        var side = new CardSide('question', '/path/to/audio-file', {
            outputTemplate: '[[text]]<div class="audio" audio-url="[[audio]]"></div>'
        });

        return side;
    }
}());