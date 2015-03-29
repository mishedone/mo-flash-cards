/**
 * Represents a single card with front and back.
 * 
 * @param {CardSide} question Question side.
 * @param {CardSide} answer   Answer side.
 */
function Card(question, answer) {
    "use strict";
    var self;
    self = this;
    
    // define properties
    self.question = question;
    self.answer = answer;
}