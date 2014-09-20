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
 * @type {Array}
 */
Snake.prototype.pythonArray = null;

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
 *
 * @type {function()}
 */
Snake.prototype.forward = null;

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

    this.forward = this.goTop;

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

    this.forward = this.goBottom;

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

    this.forward = this.goLeft;

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

    this.forward = this.goRight;

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
    return this.pythonArray[0];
};

/**
 * @param {function()} post_processing
 */
Snake.prototype.extendsHead = function(post_processing) {
    var head = this.getHead().clone();
    this.pythonArray.unshift(head);

    post_processing(head);
};

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
            this.goTop();

        } else if (event.keyCode === 37) {
            this.goLeft();

        } else if (event.keyCode === 40) {
            this.goBottom();

        } else if (event.keyCode === 39) {
            this.goRight();
        }

        if (!this.timer) {

            if (this.forward && this.forward !== null) {
                this.timer = setInterval(function() {
                    this.forward();
                }.bind(this), 750);
            }

        }

    }.bind(this);

};