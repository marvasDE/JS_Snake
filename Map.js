/**
* @constructor Map
* @parama {object} params
*/
function Map(params) {

	if (params) {
		if (params.fieldHeight) {
			this.fieldHeight = parseInt(params.fieldHeight);
		}

		if (params.fieldWidth) {
			this.fieldWidth = parseInt(params.fieldWidth);
		}

		if (params.height) {
			this.height = parseInt(params.height);
		}

		if (params.width) {
			this.width = parseInt(params.width);
		}

	}

	this.yfields = parseInt(this.height / this.fieldHeight);
	this.xfields = parseInt(this.width / this.fieldWidth);

	for (var y = 0; y < this.yfields; y++) {
		for (var x = 0; x < this.xfields; x++) {
			this.fields.push(new MapField(x, y, this.fieldHeight, this.fieldWidth));
		}
	}

}


/**
* @type {array}
*/
Map.prototype.fields = [];


/**
* @type {number}
*/
Map.prototype.height = $(window).height();

/**
* @type {number|null}
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
* @type {array|null}
*/
Map.prototype.borderFields = null;


/**
* @param {number}
* @return {MapField}
*/
Map.prototype.getField = function(id) {
	return this.fields[id];
}

/**
* @description set random background-color for all fields
*/
Map.prototype.random = function() {
	for(var field in this.fields) {
		
		this.fields[field].css.backgroundColor = this.getRandomColor();

		this.fields[field].refreshCSS();
	}
}

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
}

Map.prototype.getBorderFields = function() {

	if(this.borderFields != null) {

		this.borderFields = [];

		for(var fieldId in this.fields) {
			if(this.fields[fieldId].x == 0 || this.fields[fieldId].y == 0 || this.fields[fieldId].x == xfields || this.fields[fieldId].y == y.yfields) {
				borderFields.push(this.fields[fieldId]);
			}
		}

	}

	return this.borderFields;

}