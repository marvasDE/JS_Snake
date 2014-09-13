/**
 * @constructor
 */
function Snake() {

    var params = {
        fieldHeight: 20,
        fieldWidth: 20,
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
}

Snake.prototype.map = null;

Snake.prototype.snakeArray = null;

Snake.prototype.direction = null;


Snake.prototype.goTop = function() {

    this.extendsHead(function(head) {
        head.goTop();
    });

    this.removeTail();

};

Snake.prototype.goBottom = function() {

    this.extendsHead(function(head) {
        head.goBottom();
    });

    this.removeTail();

};

Snake.prototype.goLeft = function() {

    this.extendsHead(function(head) {
        head.goLeft();
    });

    this.removeTail();

};

Snake.prototype.goRight = function() {

    this.extendsHead(function(head) {
        head.goRight();
    });

    this.removeTail();

};

Snake.prototype.extendsHead = function(post_processing) {
    var head = this.snakeArray[0].clone();
    this.snakeArray.unshift(head);

    post_processing(head);
};

Snake.prototype.removeTail = function() {
    if (this.snakeArray.length > 4) {
        this.snakeArray[this.snakeArray.length - 1].getJQueryObject().remove();
        this.snakeArray.pop();
    }
};

Snake.prototype.getLength = function() {
    return this.snakeArray.length;
};

Snake.prototype.loadControls = function() {

    document.onkeydown = function(event) {

        if (event.keyCode == 38) {
            this.goTop();
        } else if (event.keyCode == 37) {
            this.goLeft();
        } else if (event.keyCode == 40) {
            this.goBottom();
        } else if (event.keyCode == 39) {
            this.goRight();
        }

    }.bind(this);

};