/**
 * Context for rendering
 * Controls rendering to the screen
 * @classdesc Context for rendering
 */
class Context {
    /**
     * Set context information for getting default value
     * @param {ContextInformation} info Context information
     */
    setContextInfo(info) {
        this.info = info;
    }

    /**
     * Set screen
     * @param {Screen} screen Screen system
     */
    setScreen(screen) {
        this.screen = screen;
    }

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

    drawImage(image, srcX, srcY, srcW, srcH, dstX, dstY, dstW, dstH) {}
}