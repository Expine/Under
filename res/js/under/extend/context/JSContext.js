/**
 * Context for rendering by JavaScript
 * Renders by using HTML5 API
 * @classdesc Context for rendering by JavaScript
 */
class JSContext extends Context {
    /**
     * JavaScript context constructor
     * @param {CanvasRenderingContext2D} ctx Canvas context
     */
    constructor(ctx) {
        super();
        /**
         * Canvas context for rendering
         * @type {CanvasRenderingContext2D}
         */
        this.ctx_ = ctx;
    }

    /**
     * Function to be executed before drawing
     * @override
     */
    preRendering() {
        this.ctx_.save();
        this.ctx_.scale(this.screen.gameSize, this.screen.gameSize);
        this.ctx_.fillStyle = "black";
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
     * @param {number} anchorX Anchor x point in percent (0.0 <= anchorX <= 1.0)
     * @param {number} anchorY Anchor y point in percent (0.0 <= anchorX <= 1.0)
     * @param {number} size Font size
     * @param {string} color Font color
     * @param {string} font Font name
     */
    fillText(text, x, y, anchorX, anchorY, size, color, font) {
        this.ctx_.fillStyle = "white";
        this.ctx_.font = "50px Arial";
        let metrix = this.ctx_.measureText(text);
        this.ctx_.fillText(text, x - anchorX * metrix.width, y);
    }

    /**
     * Rendering circle
     * @param {number} x X position
     * @param {number} y Y position
     * @param {number} radius Raius of circle
     * @param {number} startAngle Beginning of arc
     * @param {number} endAngle End of arc
     * @param {boolean} anticlockwise Whether it is clockwise or not
     */
    strokeCircle(x, y, radius, startAngle, endAngle, anticlockwise) {
        this.ctx_.beginPath();
        this.ctx_.strokeStyle = "red";
        this.ctx_.arc(x, y, radius, startAngle, endAngle, anticlockwise);
        this.ctx_.stroke();
        this.ctx_.closePath();
    }

    /**
     * Rendering square outline
     * @param {number} x
     * @param {number} y
     * @param {number} width
     * @param {number} height
     */
    strokeRect(x, y, width, height) {
        this.ctx_.strokeRect(x, y, width, height);
    }

    drawImage(image, x, y) {
        this.ctx_.drawImage(image, x, y);
    }
    drawImage(image, x, y, width, height) {
        this.ctx_.drawImage(image, x, y, width, height);
    }

    drawImage(image, srcX, srcY, srcW, srcH, dstX, dstY, dstW, dstH) {
        if (srcW === undefined)
            this.ctx_.drawImage(image, srcX, srcX);
        else if (dstX === undefined)
            this.ctx_.drawImage(image, srcX, srcY, srcW, srcH);
        else
            this.ctx_.drawImage(image, srcX, srcY, srcW, srcH, dstX, dstY, dstW, dstH)
    }
}