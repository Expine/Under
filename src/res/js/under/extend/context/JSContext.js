/**
 * Context for rendering by JavaScript
 * Renders by using HTML5 API
 * @implements {Context}
 * @classdesc Context for rendering by JavaScript
 */
class JSContext extends Context { // eslint-disable-line  no-unused-vars
    /**
     * JavaScript context constructor
     * @constructor
     */
    constructor() {
        super();
        /**
         * Color of the text
         * @private
         * @type {string}
         */
        this.fontColor_ = `black`;
        /**
         * Size of the text
         * @private
         * @type {number}
         */
        this.fontSize_ = 50;
        /**
         * Font name of the text
         * @private
         * @type {string}
         */
        this.fontName_ = `Arial`;

        /**
         * Color of the line
         * @private
         * @type {string}
         */
        this.lineColor_ = `red`;
        /**
         * Size of the line
         * @private
         * @type {number}
         */
        this.lineWidth_ = 1;
    }

    /**
     * Set screen
     * @param {Screen} screen Screen system
     */
    setScreen(screen) {
        super.setScreen(screen);
        /**
         * Canvas context for rendering
         * @private
         * @type {CanvasRenderingContext2D}
         */
        this.ctx_ = this.screen.getCanvas().getContext(`2d`);

        this.ctx_.mozImageSmoothingEnabled = false;
        this.ctx_.webkitImageSmoothingEnabled = false;
        this.ctx_.msImageSmoothingEnabled = false;
        this.ctx_.imageSmoothingEnabled = false;
    }

    /**
     * Set the color of text
     * @override
     * @param {string} colorName Color name
     */
    setFontColorByName(colorName) {
        this.fontColor_ = colorName;
    }

    /**
     * Set the color of text
     * @override
     * @param {number} r Red component   (0 <= r <= 255)
     * @param {number} g Green component (0 <= g <= 255)
     * @param {number} b Blue component  (0 <= b <= 255)
     */
    setFontColorByRGB(r, g, b) {
        this.fontColor_ = `rgb(` + r + `,` + g + `,` + b + `)`;
    }

    /**
     * Set the size of text
     * @override
     * @param {number} size Size of text
     */
    setFontSize(size) {
        this.fontSize_ = size;
    }

    /**
     * Set the name of font
     * @override
     * @param {string} name Name of font
     */
    setFontName(name) {
        this.fontName_ = name;
    }

    /**
     * Set the color of line
     * @override
     * @param {string} colorName Color name
     */
    setLineColorByName(colorName) {
        this.lineColor_ = colorName;
    }

    /**
     * Set the color of line
     * @override
     * @param {number} r Red component   (0 <= r <= 255)
     * @param {number} g Green component (0 <= g <= 255)
     * @param {number} b Blue component  (0 <= b <= 255)
     */
    setLineColorByRGB(r, g, b) {
        this.lineColor_ = `rgb(` + r + `,` + g + `,` + b + `)`;
    }

    /**
     * Set width of line
     * @override
     * @param {number} width Line width
     */
    setLineWidth(width) {
        this.lineWidth_ = width;
    }

    /**
     * Function to be executed before drawing
     * @override
     */
    preRendering() {
        this.ctx_.save();
        this.ctx_.scale(this.screen.gameSize, this.screen.gameSize);
        this.ctx_.fillStyle = `black`;
        this.ctx_.fillRect(0, 0, this.screen.width, this.screen.height);
    }

    /**
     * Function to be executed after drawing
     * @override
     */
    postRendering() {
        this.ctx_.restore();
    }

    /**
     * Render text
     * @override
     * @param {string} text Rendering text
     * @param {number} x X position
     * @param {number} y Y position
     * @param {number} [anchorX=0] Anchor x point in percent (0.0 <= anchorX <= 1.0)
     * @param {number} [anchorY=0] Anchor y point in percent (0.0 <= anchorX <= 1.0)
     * @param {number} [size=fontSize] Font size
     * @param {string} [color=fontColor] Font color
     * @param {string} [font=fontName] Font name
     */
    fillText(text, x, y, anchorX = 0, anchorY = 0, size = this.fontSize_, color = this.fontColor_, font = this.fontName_) {
        this.ctx_.font = size + `px ` + font;
        this.ctx_.fillStyle = color;
        this.ctx_.fillText(text, x - anchorX * this.ctx_.measureText(text).width, y + (1 - anchorY) * size);
    }

    /**
     * Rendering line
     * @param {number} sx Start x position
     * @param {number} sy Start y position
     * @param {number} ex Terminal x position
     * @param {number} ey Terminal y position
     * @param {string} color Color name of line
     * @param {number} lineWidth Line width
     */
    strokeLine(sx, sy, ex, ey, color = this.lineColor_, lineWidth = this.lineWidth_) {
        this.ctx_.strokeStyle = color;
        this.ctx_.lineWidth = lineWidth;
        this.ctx_.beginPath();
        this.ctx_.moveTo(sx, sy);
        this.ctx_.lineTo(ex, ey);
        this.ctx_.stroke();
        this.ctx_.closePath();
    }

    /**
     * Rendering circle
     * @param {number} x X position
     * @param {number} y Y position
     * @param {number} radius Raius of circle
     * @param {number} startAngle Beginning of arc
     * @param {number} endAngle End of arc
     * @param {bool} anticlockwise Whether it is clockwise or not
     * @param {string} color Color name of circle
     * @param {number} lineWidth Line of circle width
     */
    strokeCircle(x, y, radius, startAngle, endAngle, anticlockwise, color = this.lineColor_, lineWidth = this.lineWidth_) {
        this.ctx_.strokeStyle = color;
        this.ctx_.lineWidth = lineWidth;
        this.ctx_.beginPath();
        this.ctx_.arc(x, y, radius, startAngle, endAngle, anticlockwise);
        this.ctx_.stroke();
        this.ctx_.closePath();
    }

    /**
     * Rendering rectangle outline
     * @param {number} x
     * @param {number} y
     * @param {number} width
     * @param {number} height
     * @param {string} color Color name of rectangle
     * @param {number} lineWidth Line of rectangle width
     */
    strokeRect(x, y, width, height, color = this.lineColor_, lineWidth = this.lineWidth_) {
        this.ctx_.strokeStyle = color;
        this.ctx_.lineWidth = lineWidth;
        this.ctx_.strokeRect(x, y, width, height);
    }

    /**
     * Rendering rectangle
     * @override
     * @param {number} x Upper left x position
     * @param {number} y Upper left y position
     * @param {number} width Width of the rectangle
     * @param {number} height Height of the rectangle
     * @param {string} color Color name of rectangle
     * @param {number} lineWidth Line of rectangle width
     */
    fillRect(x, y, width, height, color = this.lineColor_, lineWidth = this.lineWidth_) {
        this.ctx_.fillStyle = color;
        this.ctx_.lineWidth = lineWidth;
        this.ctx_.fillRect(x, y, width, height);
    }

    /**
     * Rendering image
     * @param {number} imageID Image ID
     * @param {number} x Image x position
     * @param {number} y Image y position
     * @param {number} width Image width
     * @param {number} height Image height
     * @param {number} srcX Upper left x position of source
     * @param {number} srcY Upper left y position of source
     * @param {number} srcW Source width
     * @param {number} srcH Source height
     */
    drawImage(imageID, x, y, width, height, srcX, srcY, srcW, srcH) {
        let image = this.image.getImage(imageID);
        x = Math.round(x);
        y = Math.round(y);
        if (width === undefined) {
            this.ctx_.drawImage(image, x, y);
        } else if (srcX === undefined) {
            width = Math.round(width);
            height = Math.round(height);
            this.ctx_.drawImage(image, x, y, width, height);
        } else {
            srcX = Math.round(srcX);
            srcY = Math.round(srcY);
            srcW = Math.round(srcW);
            srcH = Math.round(srcH);
            this.ctx_.drawImage(image, srcX, srcY, srcW, srcH, x, y, width, height);
        }
    }
}
