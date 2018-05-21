/**
 * JavaScript context
 * - Controls rendering to the screen
 * - ### Renders by using HTML5 API
 * @extends {Context}
 * @classdesc JavaScript context for rendering by using HTML5 API
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
        this._fontColor = `black`;
        /**
         * Size of the text
         * @private
         * @type {number}
         */
        this._fontSize = 50;
        /**
         * Font name of the text
         * @private
         * @type {string}
         */
        this._fontName = `Arial`;

        /**
         * Color of the line
         * @private
         * @type {string}
         */
        this._lineColor = `red`;
        /**
         * Size of the line
         * @private
         * @type {number}
         */
        this._lineWidth = 1;

        /**
         * Canvas context for rendering
         * @protected
         * @type {CanvasRenderingContext2D}
         */
        this.ctx = null;
    }

    /**
     * Initialize context
     * @override
     */
    init() {
        this.ctx = this.screen.getCanvas().getContext(`2d`);
    }

    /**
     * Function to be executed before drawing
     * @override
     */
    preRendering() {
        // ignore antialiasing
        this.ctx.mozImageSmoothingEnabled = false;
        this.ctx.webkitImageSmoothingEnabled = false;
        this.ctx.msImageSmoothingEnabled = false;
        this.ctx.imageSmoothingEnabled = false;
        // save state
        this.ctx.save();
        // scale rendering size
        this.ctx.scale(this.screen.gameSize, this.screen.gameSize);
        // render background
        this.ctx.fillStyle = `black`;
        this.ctx.fillRect(0, 0, this.screen.width, this.screen.height);
    }

    /**
     * Function to be executed after drawing
     * @override
     */
    postRendering() {
        this.ctx.restore();
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
    fillText(text, x, y, anchorX = 0, anchorY = 0, size = this._fontSize, color = this._fontColor, font = this._fontName) {
        this.ctx.font = size + `px ` + font;
        this.ctx.fillStyle = color;
        this.ctx.fillText(text, x - anchorX * this.ctx.measureText(text).width, y + (1 - anchorY) * size);
    }

    /**
     * Get rendering text width
     * @abstract
     * @param {string} text Rendering text
     * @param {number} [size=fontSize] Font size
     * @param {string} [font=fontName] Font name
     * @return {number} Text width
     */
    measureText(text, size = this._fontSize, font = this._fontName) {
        this.ctx.font = size + `px ` + font;
        return this.ctx.measureText(text).width;
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
    strokeLine(sx, sy, ex, ey, color = this._lineColor, lineWidth = this._lineWidth) {
        this.ctx.strokeStyle = color;
        this.ctx.lineWidth = lineWidth;
        this.ctx.beginPath();
        this.ctx.moveTo(sx, sy);
        this.ctx.lineTo(ex, ey);
        this.ctx.stroke();
        this.ctx.closePath();
    }

    /**
     * Rendering circle
     * @param {number} x X position
     * @param {number} y Y position
     * @param {number} radius Raius of circle
     * @param {number} startAngle Beginning of arc
     * @param {number} endAngle End of arc
     * @param {boolean} anticlockwise Whether it is clockwise or not
     * @param {string} color Color name of circle
     * @param {number} lineWidth Line of circle width
     */
    strokeCircle(x, y, radius, startAngle, endAngle, anticlockwise, color = this._lineColor, lineWidth = this._lineWidth) {
        this.ctx.strokeStyle = color;
        this.ctx.lineWidth = lineWidth;
        this.ctx.beginPath();
        this.ctx.arc(x, y, radius, startAngle, endAngle, anticlockwise);
        this.ctx.stroke();
        this.ctx.closePath();
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
    strokeRect(x, y, width, height, color = this._lineColor, lineWidth = this._lineWidth) {
        this.ctx.strokeStyle = color;
        this.ctx.lineWidth = lineWidth;
        this.ctx.strokeRect(x, y, width, height);
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
    fillRect(x, y, width, height, color = this._lineColor, lineWidth = this._lineWidth) {
        this.ctx.fillStyle = color;
        this.ctx.lineWidth = lineWidth;
        this.ctx.fillRect(x, y, width, height);
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
        const image = this.image.getImage(imageID);
        x = Math.round(x);
        y = Math.round(y);
        if (width === undefined) {
            this.ctx.drawImage(image, x, y);
            return;
        }
        width = Math.round(width);
        height = Math.round(height);
        this.ctx.save();
        if (width < 0) {
            width = -width;
            x = -x - width;
            this.ctx.scale(-1, 1);
        }
        if (height < 0) {
            height = -height;
            y = -y - height;
            this.ctx.scale(1, -1);
        }
        if (srcX === undefined) {
            this.ctx.drawImage(image, x, y, width, height);
        } else {
            srcX = Math.round(srcX);
            srcY = Math.round(srcY);
            srcW = Math.round(srcW);
            srcH = Math.round(srcH);
            this.ctx.drawImage(image, srcX, srcY, srcW, srcH, x, y, width, height);
        }
        this.ctx.restore();
    }
}
