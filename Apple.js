goog.require('de.marvas.engine.Mapfield');
goog.provide('de.marvas.engine.examples.Snake.Apple');

/**
 * @constructor
 * @param {MapField} field
 * @extends {MapField}
 */
function Apple(field) {

//    goog.base(this, field.x, field.y, field.height, field.width);
    MapField.call(this, field.x, field.y, field.height, field.width);

    this.setColor('yellow');
    this.extendsCSS({
        border: '2px solid red',
        borderRadius: '20%'
    });
}

//goog.inherits(Apple, MapField);

Apple.prototype = new MapField;
//Apple.prototype = Object.create(MapField.prototype);
Apple.prototype.constructor = Apple;

