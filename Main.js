goog.require('de.marvas.engine.examples.Snake');
/**
 * @constructor
 */
function Main() {
    this.game = new Snake();
    this.game.loadControls();
}

/**
 * @type {Snake|null}
 */
Main.prototype.game = null;
 
/**
 * @type {Main}
 */
var main = null;

$(document).ready(function() {
    main = new Main();
});