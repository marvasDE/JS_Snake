/**
 * @constructor MapField
 * @param x {number}
 * @param y {number}
 * @param height {number}
 * @param width {number}
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
    ;

    if (width) {
        this.width = width;
    }

    this.css = {
        backgroundColor: this.css.backgroundColor ? this.css.backgroundColor : 'black',
        height: this.height,
        left: this.x * this.height,
        position: "absolute",
        top: this.y * this.width,
        width: this.width
    };

    if ($('#' + this.constructor.name).length == 0) {
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
 * @type {number|null}
 */
MapField.prototype.id = null;

/**
 * @type {number|null}
 */
MapField.prototype.height = 50;

/**
 * @type {number|null}
 */
MapField.prototype.width = 50;

/**
 * @type {object}
 */
MapField.prototype.css = {};

/**
 * @description refrehs the css of a dom element with this.css
 */
MapField.prototype.refreshCSS = function() {
    this.getJQueryObject().css(this.css);
};

/**
 * @type {object}
 */
MapField.prototype.jQueryObject = null;

/**
 * @return {object}
 */
MapField.prototype.getJQueryObject = function() {

    if (!this.jQueryObject) {
        this.jQueryObject = $('#' + this.id);
    }
    ;

    return this.jQueryObject;
};

MapField.prototype.setColor = function(color) {
    this.css.backgroundColor = color;
};