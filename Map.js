goog.provide('de.marvas.engine.Map');

/**
 * @constructor Map
 * @param {Object=} params
 */
function Map(params) {

    if (params) {
        if (params.fieldHeight) {
            this.fieldHeight = parseInt(params.fieldHeight, 10);
        }

        if (params.fieldWidth) {
            this.fieldWidth = parseInt(params.fieldWidth, 10);
        }

        if (params.height) {
            this.height = parseInt(params.height, 10);
        }

        if (params.width) {
            this.width = parseInt(params.width, 10);
        }

    }

    this.yfields = parseInt(this.height / this.fieldHeight, 10);
    this.xfields = parseInt(this.width / this.fieldWidth, 10);

    this.fields = [];
    for (var y = 0; y < this.yfields; y++) {
        var temp_array = [];

        for (var x = 0; x < this.xfields; x++) {
            temp_array.push(new MapField(x, y, this.fieldHeight, this.fieldWidth));
        }

        this.fields.push(temp_array);
    }

}


/**
 * @type {Array.<Array>}
 */
Map.prototype.fields = [];


/**
 * @type {jQuery|number}
 */
Map.prototype.height = $(window).height();

/**
 * @type {jQuery|number}
 */
Map.prototype.width = $(window).width();

/**
 * @type {number}
 */
Map.prototype.fieldHeight = 50;

/**
 * @type {number}
 */
Map.prototype.fieldWidth = 50;

/**
 * @type {number|null}
 */
Map.prototype.xfields = null;

/**
 * @type {number|null}
 */
Map.prototype.yfields = null;

/**
 * @type {Array|null}
 */
Map.prototype.borderFields = null;


/**
 * @param {number} x
 * @param {number} y
 * @return {MapField}
 */
Map.prototype.getField = function(x, y) {
    return this.fields[y][x];
};

/**
 * @description set random background-color for all fields
 */
Map.prototype.random = function() {
    this.fields.forEach(function(fieldArrays) {

        fieldArrays.forEach(function(field) {

            field.setColor(this.getRandomColor());
            field.refreshCSS();

        }.bind(this));

    }.bind(this));
};

/**
 * @const
 * @type {Array}
 */
Map.prototype.COLORS = ["black", "white", "yellow", "green", "red", "blue", "violet", "gray", "brown", 'gold', 'lila', 'lightblue'];

/**
 * @description get a random color of this.colors
 * @return {string}
 */
Map.prototype.getRandomColor = function() {
    return this.COLORS[Math.floor(Math.random() * this.COLORS.length)];
};

Map.prototype.getBorderFields = function() {

    if (this.borderFields === null) {

        this.borderFields = [];

        this.fields.forEach(function(fieldArrays) {

            fieldArrays.forEach(function(field) {

                if (this.isFieldBorder(field)) {
                    this.borderFields.push(field);
                }

            }.bind(this));


        }.bind(this));

    }

    return this.borderFields;

};

/**
 * @param {MapField} field
 * @returns {boolean}
 */
Map.prototype.isFieldBorder = function(field) {
    return field.x === 0 || field.y === 0 || field.x === this.xfields - 1 || field.y === this.yfields - 1;
};

/**
 * @returns {MapField}
 */
Map.prototype.getRandomField = function() {
    return this.fields[Math.floor(Math.random() * this.fields.length)][Math.floor(Math.random() * this.fields.length)];
};

/**
 * @returns {MapField}
 */
Map.prototype.getRandomInnerField = function() {
    var randomField;
    do {
        randomField = this.getRandomField();
    }
    while (this.isFieldBorder(randomField));

    return randomField;
};