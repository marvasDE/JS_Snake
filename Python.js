goog.require('de.marvas.engine.Mapfield');

/**
 * @constructor
 * @param {MapField} field
 */
function Python(field) {
    this.css.backgroundColor = 'white';
    MapField.call(this, field.x, field.y, field.height, field.width);
}

Python.prototype = new MapField;
Python.prototype.constructor = Python;

Python.prototype.goTop = function() {
    this.y--;
    this.css.top = this.css.top - this.height;
    this.refreshCSS();
};

Python.prototype.goBottom = function() {
    this.y++;
    this.css.top = this.css.top + this.height;
    this.refreshCSS();
};

Python.prototype.goLeft = function() {
    this.x--;
    this.css.left = this.css.left - this.width;
    this.refreshCSS();
};

Python.prototype.goRight = function() {
    this.x++;
    this.css.left = this.css.left + this.width;
    this.refreshCSS();
};

/**
 * @returns {Python}
 */
Python.prototype.clone = function() {
    return new Python(this);
};