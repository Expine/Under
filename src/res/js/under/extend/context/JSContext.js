/**
 * Context for rendering by JavaScript
 * Renders by using HTML5 API
 * @classdesc Context for rendering by JavaScript
 */
class JSContext extends Context { // eslint-disable-line  no-unused-vars
    /**
     * JavaScript context constructor
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
        this.fontSize = 50;
        /**
         * Font name of the text
         * @private
         * @type {string}
         */
        this.fontName = `Arial`;

        // set default image manager
        this.setContextImage(new JSCachedImage());
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
     * @interface
     * @param {string} colorName Color name
     */
    setFontColorByName(colorName) {
        this.fontColor_ = colorName;
    }

    /**
     * Set the color of text
     * @interface
     * @param {number} r Red component   (0 <= r <= 255)
     * @param {number} g Green component (0 <= g <= 255)
     * @param {number} b Blue component  (0 <= b <= 255)
     */
    setFontColorByRGB(r, g, b) {
        this.fontColor_ = `rgb(` + r + `,` + g + `,` + b + `)`;
    }

    /**
     * Set the size of text
     * @interface
     * @param {number} size Size of text
     */
    setFontSize(size) {
        this.fontSize = size;
    }

    /**
     * Set the name of font
     * @interface
     * @param {string} name Name of font
     */
    setFontName(name) {
        this.fontName = name;
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
    fillText(text, x, y, anchorX = 0, anchorY = 0, size = this.fontSize, color = this.fontColor_, font = this.fontName) {
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
     */
    strokeLine(sx, sy, ex, ey, color) {
        this.ctx_.strokeStyle = `hsl( ` + color + `, 100%, 50% )`;
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
     * @param {boolean} anticlockwise Whether it is clockwise or not
     */
    strokeCircle(x, y, radius, startAngle, endAngle, anticlockwise) {
        this.ctx_.beginPath();
        this.ctx_.strokeStyle = `red`;
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
        this.ctx_.strokeStyle = `red`;
        this.ctx_.strokeRect(x, y, width, height);
    }

    drawImage(imageID, srcX, srcY, srcW, srcH, dstX, dstY, dstW, dstH) {
        let image = this.image.getImage(imageID);
        if (srcW === undefined) {
            this.ctx_.drawImage(image, srcX, srcX);
        } else if (dstX === undefined) {
            this.ctx_.drawImage(image, srcX, srcY, srcW, srcH);
        } else {
            this.ctx_.drawImage(image, srcX, srcY, srcW, srcH, dstX, dstY, dstW, dstH);
        }
    }
}
