/**
 * Context for rendering
 * Controls rendering to the screen
 * @classdesc Context for rendering
 */
class Context {
    /**
     * Set screen
     * @param {Screen} screen Screen system
     */
    setScreen(screen) {
        /**
         * Screen for rendering
         * @protected
         * @type {Screen}
         */
        this.screen = screen;
    }

    /**
     * Set context image manager
     * @param {ContextImage} contextImage Context image manager
     */
    setContextImage(contextImage) {
        /**
         * Context image manager
         * @protected
         * @type {ContextImage}
         */
        this.image = contextImage;
    }

    /**
     * Set the color of text
     * @interface
     * @param {string} colorName Color name
     */
    setFontColorByName(colorName) {}

    /**
     * Set the color of text
     * @interface
     * @param {number} r Red component   (0 <= r <= 255)
     * @param {number} g Green component (0 <= g <= 255)
     * @param {number} b Blue component  (0 <= b <= 255)
     */
    setFontColorByRGB(r, g, b) {}

    /**
     * Set the size of text
     * @interface
     * @param {number} size Size of text
     */
    setFontSize(size) {}

    /**
     * Set the name of font
     * @interface
     * @param {string} name Name of font
     */
    setFontName(name) {}

    /**
     * Function to be executed before drawing
     * @interface
     */
    preRendering() {}

    /**
     * Function to be executed after drawing
     * @interface
     */
    postRendering() {}

    /**
     * Render text
     * @interface
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
     * Rendering circle outline
     * @interface
     * @param {number} x X position
     * @param {number} y Y position
     * @param {number} radius Raius of circle
     * @param {number} startAngle Beginning of arc
     * @param {number} endAngle End of arc
     * @param {boolean} anticlockwise Whether it is clockwise or not
     */
    strokeCircle(x, y, radius, startAngle, endAngle, anticlockwise) {}

    /**
     * Rendering square outline
     * @interface
     * @param {number} x
     * @param {number} y
     * @param {number} width
     * @param {number} height
     */
    strokeRect(x, y, width, height) {}

    drawImage(imageID, srcX, srcY, srcW, srcH, dstX, dstY, dstW, dstH) {}
}