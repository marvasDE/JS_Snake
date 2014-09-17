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


    var head;
    do {
        head = this.map.getRandomField();
    }
    while (this.map.isFieldBorder(head));

    this.snakeArray = [new Python(head)];

//    var dropField;
//    do {
//        dropField = this.map.getRandomField();
//    } while (this.map.isFieldBorder(dropField));
//
//    this.drop = new Drop(dropField);

}

/**
 * @type {Map}
 */
Snake.prototype.map = null;

/**
 * @type {Array}
 */
Snake.prototype.snakeArray = null;

/**
 * @type {string}
 */
Snake.prototype.direction = null;



Snake.prototype.goTop = function() {

    var nextField = this.map.getField(this.getHead().x, this.getHead().y - 1);

    if (!this.map.isFieldBorder(nextField)) {
        this.extendsHead(function(head) {
            head.goTop();
        });

        this.removeTail();
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

        this.removeTail();
    }
};

Snake.prototype.goLeft = function() {

    var nextField = this.map.getField(this.getHead().x - 1, this.getHead().y);

    if (!this.map.isFieldBorder(nextField)) {

        this.extendsHead(function(head) {
            head.goLeft();
        });

        this.removeTail();
    }

};

Snake.prototype.goRight = function() {

    var nextField = this.map.getField(this.getHead().x + 1, this.getHead().y);

    if (!this.map.isFieldBorder(nextField)) {
        this.extendsHead(function(head) {
            head.goRight();
        });
        this.removeTail();
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
    if (this.snakeArray.length > 4) {
        this.snakeArray[this.snakeArray.length - 1].getJQueryObject().remove();
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