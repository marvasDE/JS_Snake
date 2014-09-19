goog.require('de.marvas.engine.Mapfield');
goog.provide('de.marvas.engine.examples.Snake.Apple');

/**
 * @constructor
 * @param {MapField} field
 */
function Apple(field) {
    this.setColor('yellow');
    MapField.call(this, field.x, field.y, field.height, field.width);
}

Apple.prototype = new MapField;
Apple.prototype.constructor = Apple;

