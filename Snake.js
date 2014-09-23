goog.require('de.marvas.engine.Map');
goog.require('de.marvas.engine.examples.Snake.Apple');
goog.require('de.marvas.engine.examples.Snake.Python');
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
    this.pythonArray = [new Python(head)];


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
 * @type {Array.<Python>}
 */
Snake.prototype.pythonArray = null;

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

    var checkSnakePosition = false;

    if (this.pythonArray && this.pythonArray.length > 0) {

//        for (var i in this.pythonArray) {
//            if (checkSnakePosition || this.pythonArray[i].isSamePosition(nextField)) {
//                checkSnakePosition = true;
//            }
//        }

        this.pythonArray.forEach(function(field) {
            if (checkSnakePosition || nextField.isSamePosition(field)) {
                checkSnakePosition = true;
            }
        });
    }

    return checkSnakePosition || this.map.isFieldBorder(nextField);
};

Snake.prototype.die = function() {
    document.onkeydown = function(event) {
    };
    clearInterval(this.timer);
    this.forward = null; // error
    this.currentDirection = null; // error
    $('body').append('<div style="position:absolute; z-index:22222222222; top: 25%; left: 2%; font-size: 80px; font-family: mono; color: white;">GAME OVER</div>');
};

Snake.prototype.goTop = function() {

    var nextField = this.map.getField(this.getHead().x, this.getHead().y - 1);

    if (!this.isBadField(nextField)) {
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
    return this.pythonArray[0];
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
    if (this.pythonArray.length > this.pythonLength) {
        this.pythonArray[this.pythonArray.length - 1].destroyDOM();
        this.pythonArray.pop();
    }
};

/**
 * @returns {number}
 */
Snake.prototype.getLength = function() {
    return this.pythonArray.length;
};


Snake.prototype.loadControls = function() {

    document.onkeydown = function(event) {

        if (event.keyCode === 38) {
            if (this.currentDirection !== this.direction.BOTTOM) {
                this.forward = this.goTop;
                this.currentDirection = this.direction.TOP;
            }
        } else if (event.keyCode === 37) {
            if (this.currentDirection !== this.direction.RIGHT) {
                this.forward = this.goLeft;
                this.currentDirection = this.direction.LEFT;
            }

        } else if (event.keyCode === 40) {
            if (this.currentDirection !== this.direction.TOP) {
                this.forward = this.goBottom;
                this.currentDirection = this.direction.BOTTOM;
            }

        } else if (event.keyCode === 39) {
            if (this.currentDirection !== this.direction.LEFT) {
                this.forward = this.goRight;
                this.currentDirection = this.direction.RIGHT;
            }
        }

        if (!this.timer) {

            if (this.currentDirection !== null && this.forward) {
                this.timer = setInterval(function() {
                    this.forward();
                }.bind(this), 200);
            }

        }

    }.bind(this);

};