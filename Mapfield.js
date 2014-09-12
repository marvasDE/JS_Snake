/**
* @constructor MapField
* @param x {number}
* @param y {number}
* @param height {number}
* @param width {number}
*/
function MapField(x, y, height, width) {

	this.id = 'field_' + x + '_' + y;
	this.x = x;
	this.y = y;

	if (height) {
		this.height = height;
	};

	if (width) {
		this.width = width;
	};

	this.css = {
    	backgroundColor: 'black',
		height: this.height,
		left: this.x * this.height,
		position: "absolute",
		top: this.y * this.width,
		width: this.width
	}


	if($('#field_' + x + '_' + y).length == 0) {
		$('<div/>', {
		    id: this.id,
		    title: 'X: ' + x + ' , Y:' + y,
		    text: '',
		    css: this.css
		}).appendTo('body');
	}

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
* @description refrehs the css of a dom element with this.css
*/
MapField.prototype.refreshCSS = function() {
	this.getJQueryObject().css(this.css);
}

/**
* @type {object}
*/
MapField.prototype.jQueryObject = null

/**
* @return {object}
*/
MapField.prototype.getJQueryObject = function() {

	if (!this.jQueryObject) {
		this.jQueryObject = $('#' + this.id);
	};

	return this.jQueryObject;
}

MapField.prototype.setColor = function(color) {
	this.css.backgroundColor = color;
}