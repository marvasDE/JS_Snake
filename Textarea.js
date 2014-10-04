goog.provide('de.marvas.engine.Textarea');
goog.require('de.marvas.engine.Map');

/**
 * @constructor Textarea
 * @param {string} text
 * @param {Map} map
 * @param {number} verticalAlign
 * @param {number} horizontalAlign
 * @param {Object=} css u know what to do, and do it on your on risk
 */
function Textarea(text, map, verticalAlign, horizontalAlign, css) {
    this.text = text;
    this.map = map;

//    console.log(this.text);
//    console.log(this.text.length); // 10
//    console.log(this.map.xfields); // 33

    var pixels = this.map.xfields * this.map.fieldWidth;
    var height = this.map.yfields * this.map.fieldHeight;

    var generatedCSS = {};

    generatedCSS.fontSize = (pixels / (this.text.length / 1.3)) + 'px';
    generatedCSS.width = pixels;

    if (horizontalAlign === this.align.CENTER) {
        generatedCSS.textAlign = 'center';
    }

    this.css = $.extend(this.css, css, generatedCSS);
    this.id = this.constructor.name + new Date().getTime();

    $('<div/>', {
        id: this.id,
        text: this.text,
        css: this.css
    }).appendTo('body');

    var fontHeigth = $('#' + this.id).height();

    setTimeout(function() {
        $('#' + this.id).animate({top: (height / 2) - (fontHeigth / 2) + 'px'}, 1500);
    }.bind(this), 1);
}

/**
 * 
 * @type {string}
 */
Textarea.prototype.text = '';

/**
 * 
 * @type {Object}
 */
Textarea.prototype.css = {
    fontFamily: 'Sans-Serif',
    left: 0,
    position: 'absolute',
    zIndex: 222222222
};

/**
 * 
 * @type {number}
 */
Textarea.prototype.textlength = 0;

/**
 * @enum {number}
 */
Textarea.prototype.align = {
    TOP: 0,
    BOTTOM: 1,
    LEFT: 2,
    RIGHT: 3,
    MIDDLE: 4,
    CENTER: 4 // like MIDDLE. both values can be used as the same
};

