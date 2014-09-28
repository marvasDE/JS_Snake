goog.require('de.marvas.engine.Mapfield');
goog.provide('de.marvas.engine.MapfieldStorage');

/**
 * @constructor
 */
function MapfieldStorage() {
    // not static
    this.simpleList = [];
    this.gridList = [];
}

/**
 * @type {Array}
 */
MapfieldStorage.prototype.simpleList = [];

/**
 * @type {Array.<Array>}
 */
MapfieldStorage.prototype.gridList = [];

/**
 * @param {MapField} field
 */
MapfieldStorage.prototype.add = function(field) {
    this.simpleList.push(field);
    this.addToGrid(field);
};

/**
 * @param {MapField} field
 */
MapfieldStorage.prototype.push = function(field) {
    this.add(field);
};

/**
 * @private
 * @param {MapField} field
 */
MapfieldStorage.prototype.addToGrid = function(field) {
    if (!this.gridList[field.x]) {
        this.gridList[field.x] = [];
    }
    this.gridList[field.x][field.y] = field;
};

/**
 * @private
 * @param {MapField} field
 */
MapfieldStorage.prototype.removeFromGrid = function(field) {
    if (!this.gridList[field.x]) {
        this.gridList[field.x] = [];
    }
    this.gridList[field.x][field.y] = null;
};

/**
 * @returns {number}
 */
MapfieldStorage.prototype.getLength = function() {
    return this.simpleList.length;
};

/**
 * @param {MapField} field
 */
MapfieldStorage.prototype.unshift = function(field) {
    this.simpleList.unshift(field);
    this.addToGrid(field);
};

/**
 * @returns {?|MapField}
 */
MapfieldStorage.prototype.getFirst = function() {
    return this.simpleList[0];
};


MapfieldStorage.prototype.pop = function() {
    this.removeFromGrid(this.getLast());
    this.simpleList.pop();
};

/**
 * Synonym for pop
 */
MapfieldStorage.prototype.removeLast = function() {
    this.pop();
};

/**
 * @returns {MapField}
 */
MapfieldStorage.prototype.getLast = function() {
    return this.simpleList[this.getLength() - 1];
};

/**
 * @param {number} x
 * @param {number} y
 * @return {MapField|null}
 */
MapfieldStorage.prototype.getField = function(x, y) {
    if (!this.gridList[x]) {
        return null;
    } else if (!this.gridList[x][y]) {
        return null;
    }

    return this.gridList[x][y];
};