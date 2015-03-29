/**
 * Represents all things related to a single side of a card.
 * 
 * @param {string} text    Text written on the side.
 * @param {string} audio   Url that plays the text.
 * @param {Object} options Initialize the player.
 */
function CardSide(text, audio, options) {
    "use strict";
    var self, key;
    self = this;
    
    // define default options
    self.outputTemplate = '[[text]]' +
        '<button audio-url="[[audio]]" class="card-player-audio btn btn-default btn-xs">' +
        '<span class="glyphicon glyphicon glyphicon-volume-up" aria-hidden="true"></span>' +
        '</button>';
    
    // update the options based on the passed JSON
    for (key in options) {
        if (options.hasOwnProperty(key) && self.hasOwnProperty(key)) {
            self[key] = options[key];
        }
    }
    
    // define properties
    self.text = text;
    self.audio = audio;
    self.output = self.outputTemplate.replace('[[text]]', self.text).replace('[[audio]]', self.audio);
}