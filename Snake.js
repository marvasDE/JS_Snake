goog.require('de.marvas.engine.Map');
goog.require('de.marvas.engine.examples.Snake.Apple');

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
    this.snakeArray = [new Python(head)];


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
 * @type {Array}
 */
Snake.prototype.snakeArray = null;

/**
 * @private
 * @type {number}
 */
Snake.prototype.pythonLength = 4;

/**
 * @type {string}
 */
Snake.prototype.direction = null;

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
};

Snake.prototype.goTop = function() {

    var nextField = this.map.getField(this.getHead().x, this.getHead().y - 1);

    if (!this.map.isFieldBorder(nextField)) {
        this.extendsHead(function(head) {
            head.goTop();
        });

        if (nextField.isDifferentPosition(this.apple)) {
            this.removeTail();
        } else {
            this.eatApple();
        }
    } else {
        // $('body').append('<div style="position:absolute; z-index:22222222222; top: 25%; left: 25%; font-size: 150px; font-family: mono; color: white;">GAME OVER</div>');
    }
};

Snake.prototype.goBottom = function() {

    var nextField = this.map.getField(this.getHead().x, this.getHead().y + 1);

    if (!this.map.isFieldBorder(nextField)) {

        this.extendsHead(function(head) {
            head.goBottom();
        });

        if (nextField.isDifferentPosition(this.apple)) {
            this.removeTail();
        } else {
            this.eatApple();
        }
    }
};

Snake.prototype.goLeft = function() {

    var nextField = this.map.getField(this.getHead().x - 1, this.getHead().y);

    if (!this.map.isFieldBorder(nextField)) {

        this.extendsHead(function(head) {
            head.goLeft();
        });

        if (nextField.isDifferentPosition(this.apple)) {
            this.removeTail();
        } else {
            this.eatApple();
        }
    }

};

Snake.prototype.goRight = function() {

    var nextField = this.map.getField(this.getHead().x + 1, this.getHead().y);

    if (!this.map.isFieldBorder(nextField)) {
        this.extendsHead(function(head) {
            head.goRight();
        });

        if (nextField.isDifferentPosition(this.apple)) {
            this.removeTail();
        } else {
            this.eatApple();
        }
    }

};

/**
 * @returns {Python}
 */
Snake.prototype.getHead = function() {
    return this.snakeArray[0];
};

/**
 * @param {function} post_processing
 */
Snake.prototype.extendsHead = function(post_processing) {
    var head = this.getHead().clone();
    this.snakeArray.unshift(head);

    post_processing(head);
};

Snake.prototype.removeTail = function() {
    if (this.snakeArray.length > this.pythonLength) {
        this.snakeArray[this.snakeArray.length - 1].destroyDOM();
        this.snakeArray.pop();
    }
};

/**
 * @returns {number}
 */
Snake.prototype.getLength = function() {
    return this.snakeArray.length;
};


Snake.prototype.loadControls = function() {

    document.onkeydown = function(event) {

        if (event.keyCode === 38) {
            this.goTop();
        } else if (event.keyCode === 37) {
            this.goLeft();
        } else if (event.keyCode === 40) {
            this.goBottom();
        } else if (event.keyCode === 39) {
            this.goRight();
        }

    }.bind(this);

};