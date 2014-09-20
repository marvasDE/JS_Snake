goog.provide('de.marvas.engine.Mapfield');

/**
 * @constructor MapField
 * @param {number} x
 * @param {number} y
 * @param {number=} height
 * @param {number=} width
 * @param {string=} id
 */
function MapField(x, y, height, width, id) {

    if (id) {
        this.id = id;
    } else {
        this.id = this.constructor.name + '_' + x + '_' + y + '_' + new Date().getTime();
    }

    this.x = x;
    this.y = y;

    if (height) {
        this.height = height;
    }


    if (width) {
        this.width = width;
    }

    this.css = {
        backgroundColor: 'black',
        height: this.height,
        left: this.x * this.height,
        position: "absolute",
        top: this.y * this.width,
        width: this.width
    };

    if ($('#' + this.constructor.name).length === 0) {
        $('<div/>', {
            id: this.constructor.name
        }).appendTo('body');
    }

    //if ($('#' + this.id).length == 0) {
    $('<div/>', {
        id: this.id,
        title: 'X: ' + x + ' , Y:' + y,
        text: '',
        css: this.css
    }).appendTo('#' + this.constructor.name);
    //}
}

/**
 * @private
 * @type {string|null}
 */
MapField.prototype.id = null;

/**
 * @type {number}
 */
MapField.prototype.height = 50;

/**
 * @type {number}
 */
MapField.prototype.width = 50;

/**
 * @type {Object}
 */
MapField.prototype.css = {};

/**
 * @type {Object}
 */
MapField.prototype.jQueryObject = null;


/**
 * @param {string} color
 */
MapField.prototype.setColor = function(color) {
    this.css.backgroundColor = color;
};


/**
 * @param {Object} cssObject
 */
MapField.prototype.extendsCSS = function(cssObject) {
    $.extend(this.css, cssObject);
    this.refreshCSS();
};

/**
 * @description refrehs the css of a dom element with this.css
 */
MapField.prototype.refreshCSS = function() {
    this.getJQueryObject().css(this.css);
};

/**
 * @return {Object}
 */
MapField.prototype.getJQueryObject = function() {

    if (!this.jQueryObject) {
        this.jQueryObject = $('#' + this.id);
    }
    ;

    return this.jQueryObject;
};


/**
 * @param {MapField} field
 * @returns {boolean}
 */
MapField.prototype.isSamePosition = function(field) {
    return this.x === field.x && this.y === field.y;
};

/**
 * @param {MapField} field
 * @returns {boolean}
 */
MapField.prototype.isDifferentPosition = function(field) {
    return !this.isSamePosition(field);
};


MapField.prototype.destroyDOM = function() {
    this.getJQueryObject().remove();
};