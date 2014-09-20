goog.require('de.marvas.engine.Mapfield');
goog.provide('de.marvas.engine.examples.Snake.Apple');

/**
 * @constructor
 * @param {MapField} field
 */
function Apple(field) {
    MapField.call(this, field.x, field.y, field.height, field.width);

    this.setColor('yellow');
    this.extendsCSS({
        border: '2px solid red',
        borderRadius: '20%'
    });
}

Apple.prototype = new MapField;
Apple.prototype.constructor = Apple;

