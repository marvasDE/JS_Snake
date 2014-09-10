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
	}

	this.fields = [];

	this.height = parseInt($(window).height() / this.fieldHeight);
	this.width = parseInt($(window).width() / this.fieldWidth);

	for (var y = 0; y < this.height; y++) {
		for (var x = 0; x < this.width; x++) {
			this.fields.push(new MapField(x, y, this.fieldHeight, this.fieldWidth));
		}
	}

}

/**
* @type {number|null}
*/
Map.prototype.fieldHeight = 50;

/**
* @type {number|null}
*/
Map.prototype.fieldWidth = 50;

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
Map.prototype.COLORS = ["black", "white", "yellow", "green", "red", "blue", "violet", "gray", "brown"];

/**
* @description get a random color of this.colors
* @return {string}
*/
Map.prototype.getRandomColor = function() {
   return this.COLORS[Math.floor(Math.random() * this.COLORS.length)];
}
