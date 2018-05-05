/**
 * Context
 * - ### Controls rendering to the screen
 * @interface
 * @classdesc Context for rendering to the screen
 */
class Context { // eslint-disable-line  no-unused-vars
    /**
     * Context constructor
     * @constructor
     */
    constructor() {
        /**
         * Screen for rendering
         * @protected
         * @type {GameScreen}
         */
        this.screen = null;

        /**
         * Context image manager
         * @protected
         * @type {IImageManager}
         */
        this.image = null;
    }

    /**
     * Set screen
     * @param {GameScreen} screen Screen system
     */
    setScreen(screen) {
        this.screen = screen;
    }

    /**
     * Set image manager
     * @param {IImageManager} imageManager Image manager
     */
    setImageManager(imageManager) {
        this.image = imageManager;
    }

    /**
     * Initialize context
     * @abstract
     */
    init() {}

    /**
     * Function to be executed before drawing
     * @abstract
     */
    preRendering() {}

    /**
     * Function to be executed after drawing
     * @abstract
     */
    postRendering() {}

    /**
     * Get rendering text width
     * @abstract
     * @param {string} text Rendering text
     * @param {number} size Font size
     * @param {string} font Font name
     * @return {number} Text width
     */
    measureText(text, size, font) {}

    /**
     * Render text
     * @abstract
     * @param {string} text Rendering text
     * @param {number} x X position
     * @param {number} y Y position
     * @param {number} anchorX Anchor x point in percent (0.0 <= anchorX <= 1.0)
     * @param {number} anchorY Anchor y point in percent (0.0 <= anchorX <= 1.0)
     * @param {number} size Font size
     * @param {string} color Font color
     * @param {string} font Font name
     */
    fillText(text, x, y, anchorX, anchorY, size, color, font) {}

    /**
     * Rendering line
     * @abstract
     * @param {number} sx Start x position
     * @param {number} sy Start y position
     * @param {number} ex Terminal x position
     * @param {number} ey Terminal y position
     * @param {string} color Color name of line
     * @param {number} lineWidth Line width
     */
    strokeLine(sx, sy, ex, ey, color, lineWidth) {}

    /**
     * Rendering circle outline
     * @abstract
     * @param {number} x X position
     * @param {number} y Y position
     * @param {number} radius Raius of circle
     * @param {number} startAngle Beginning of arc
     * @param {number} endAngle End of arc
     * @param {boolean} anticlockwise Whether it is clockwise or not
     * @param {string} color Color name of circle
     * @param {number} lineWidth Line of circle width
     */
    strokeCircle(x, y, radius, startAngle, endAngle, anticlockwise, color, lineWidth) {}

    /**
     * Rendering rectangle outline
     * @abstract
     * @param {number} x Upper left x position
     * @param {number} y Upper left y position
     * @param {number} width Width of the rectangle
     * @param {number} height Height of the rectangle
     * @param {string} color Color name of rectangle
     * @param {number} lineWidth Line of rectangle width
     */
    strokeRect(x, y, width, height, color, lineWidth) {}

    /**
     * Rendering rectangle
     * @abstract
     * @param {number} x Upper left x position
     * @param {number} y Upper left y position
     * @param {number} width Width of the rectangle
     * @param {number} height Height of the rectangle
     * @param {string} color Color name of rectangle
     * @param {number} lineWidth Line of rectangle width
     */
    fillRect(x, y, width, height, color, lineWidth) {}

    /**
     * Rendering image
     * @abstract
     * @param {Object} imageID Image ID
     * @param {number} x Image x position
     * @param {number} y Image y position
     * @param {number} width Image width
     * @param {number} height Image height
     * @param {number} srcX Upper left x position of source
     * @param {number} srcY Upper left y position of source
     * @param {number} srcW Source width
     * @param {number} srcH Source height
     */
    drawImage(imageID, x, y, width, height, srcX, srcY, srcW, srcH) {}
}
