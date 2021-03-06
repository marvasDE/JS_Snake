goog.require('de.marvas.engine.Map');
goog.require('de.marvas.engine.examples.Snake.Apple');
goog.require('de.marvas.engine.examples.Snake.Python');
goog.require('de.marvas.engine.Textarea');
goog.provide('de.marvas.engine.examples.Snake');

/**
 * @constructor
 */
function Snake() {

    var params = {
        fieldHeight: 15,
        fieldWidth: 15,
        height: 500,
        width: 500
    };

    this.map = new Map(params);

    this.map.getBorderFields().forEach(function(field) {
        field.setColor('gray');
        field.refreshCSS();
    });

    // generate head
    var head = this.map.getRandomInnerField();
    this.pythonArray.add(new Python(head));


    // experimentell
    this.generateApple();

}

/**
 * @type {Map}
 */
Snake.prototype.map = null;

/**
 * @type {Apple}
 */
Snake.prototype.apple = null;

/**
 * @type {MapfieldStorage}
 */
Snake.prototype.pythonArray = new MapfieldStorage();

/**
 * @private
 * @type {number}
 */
Snake.prototype.pythonLength = 4;

/**
 * @enum {number}
 */
Snake.prototype.direction = {
    TOP: 0,
    BOTTOM: 1,
    LEFT: 2,
    RIGHT: 3
};

/**
 * @type {number|null}
 */
Snake.prototype.currentDirection = null;

/**
 *
 * @type {function()|null}
 */
Snake.prototype.forward = null;

/**
 * @type {number}
 */
Snake.prototype.eatenApples = 0;

/**
 * generates an random apple
 */
Snake.prototype.generateApple = function() {
    var appleField = this.map.getRandomInnerField();
    this.apple = new Apple(appleField);
};

Snake.prototype.eatApple = function() {
    this.apple.destroyDOM();
    this.generateApple();
    this.pythonLength++;

    this.eatenApples++;

    if ($('#points').length === 0) {
        $('body').append('<div id="points" style="position: absolute;top: 50%; left: 500px;"></div>');
    }

    $('#points').html('<span style="color: green; font-size: 40pt;">Du hast <span style="color: red; font-size: 80pt;">' + this.eatenApples + '</span> &Auml;pfel gegessen! :)</span>');
};

/**
 * @private
 * @param {MapField} nextField
 */
Snake.prototype.goPostProcessing = function(nextField) {
    if (nextField.isDifferentPosition(this.apple)) {
        this.removeTail();
    } else {
        this.eatApple();
    }
};

/**
 * @param {MapField} nextField
 * @returns {boolean}
 */
Snake.prototype.isBadField = function(nextField) {

    var checkSnakePosition = this.pythonArray.getField(nextField.x, nextField.y);

    return checkSnakePosition != null || this.map.isFieldBorder(nextField);
};

Snake.prototype.die = function() {
    document.onkeydown = function(event) {
    };
    clearInterval(this.timer);
    this.forward = null; // error
    this.currentDirection = null; // error

    new Textarea("GAME OVER", this.map, 0, Textarea.prototype.align.CENTER, {top: '0%', color: 'white'});
};

Snake.prototype.goTop = function() {

    var nextField = this.map.getField(this.getHead().x, this.getHead().y - 1);

    if (!this.isBadField(nextField)) {
        this.currentDirection = this.direction.TOP;

        this.extendsHead(function(head) {
            head.goTop();
        });

        this.goPostProcessing(nextField);

    } else {
        this.die();
    }
};

Snake.prototype.goBottom = function() {

    var nextField = this.map.getField(this.getHead().x, this.getHead().y + 1);

    if (!this.isBadField(nextField)) {
        this.currentDirection = this.direction.BOTTOM;

        this.extendsHead(function(head) {
            head.goBottom();
        });

        this.goPostProcessing(nextField);
    } else {
        this.die();
    }
};

Snake.prototype.goLeft = function() {

    var nextField = this.map.getField(this.getHead().x - 1, this.getHead().y);

    if (!this.isBadField(nextField)) {
        this.currentDirection = this.direction.LEFT;

        this.extendsHead(function(head) {
            head.goLeft();
        });

        this.goPostProcessing(nextField);
    } else {
        this.die();
    }

};

Snake.prototype.goRight = function() {

    var nextField = this.map.getField(this.getHead().x + 1, this.getHead().y);

    if (!this.isBadField(nextField)) {
        this.currentDirection = this.direction.RIGHT;

        this.extendsHead(function(head) {
            head.goRight();
        });

        this.goPostProcessing(nextField);
    } else {
        this.die();
    }

};

/**
 * @returns {Python}
 */
Snake.prototype.getHead = function() {
    return this.pythonArray.getFirst();
};

/**
 * @private
 * @param {function(MapField)} post_processing
 */
Snake.prototype.extendsHead = function(post_processing) {
    var head = this.getHead().clone();
    this.pythonArray.unshift(head);

    post_processing(head);
};

/**
 * @private
 */
Snake.prototype.removeTail = function() {
    if (this.pythonArray.getLength() > this.pythonLength) {
        this.pythonArray.getLast().destroyDOM();
        this.pythonArray.pop();
    }
};

/**
 * @returns {number}
 */
Snake.prototype.getLength = function() {
    return this.pythonArray.getLength();
};


Snake.prototype.loadControls = function() {

    document.onkeydown = function(event) {

        if (event.keyCode === 38) {
            if (this.currentDirection !== this.direction.BOTTOM) {
                this.forward = this.goTop;
            }
        } else if (event.keyCode === 37) {
            if (this.currentDirection !== this.direction.RIGHT) {
                this.forward = this.goLeft;
            }

        } else if (event.keyCode === 40) {
            if (this.currentDirection !== this.direction.TOP) {
                this.forward = this.goBottom;
            }

        } else if (event.keyCode === 39) {
            if (this.currentDirection !== this.direction.LEFT) {
                this.forward = this.goRight;
            }
        }

        if (!this.timer) {

            if (this.forward) {
                this.timer = setInterval(function() {
                    this.forward();
                }.bind(this), 150);
            }

        }

    }.bind(this);

};