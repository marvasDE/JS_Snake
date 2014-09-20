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

$(document).ready(function() {
    var main = new Main();
});