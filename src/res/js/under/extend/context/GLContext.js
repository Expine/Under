// TODO: Should implements
/**
 * Context for rendering by WebGL
 * Renders by using WebGL
 * @implements {Context}
 * @classdesc Context for rendering by WebGL
 */
class GLContext extends Context { // eslint-disable-line  no-unused-vars
    /**
     * Set screen
     * @param {Screen} screen Screen system
     */
    setScreen(screen) {
        super.setScreen(screen);
        /**
         * GL context for rendering
         * @private
         * @type {WebGLRenderingContext}
         */
        this.gl_ = this.screen.getCanvas().getContext(`webgl`);
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
     * Set the color of line
     * @interface
     * @param {string} colorName Color name
     */
    setLineColorByName(colorName) {}

    /**
     * Set the color of line
     * @interface
     * @param {number} r Red component   (0 <= r <= 255)
     * @param {number} g Green component (0 <= g <= 255)
     * @param {number} b Blue component  (0 <= b <= 255)
     */
    setLineColorByRGB(r, g, b) {}

    /**
     * Set width of line
     * @interface
     * @param {number} width Line width
     */
    setLineWidth(width) {}

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
     * Rendering line
     * @interface
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
     * @interface
     * @param {number} x X position
     * @param {number} y Y position
     * @param {number} radius Raius of circle
     * @param {number} startAngle Beginning of arc
     * @param {number} endAngle End of arc
     * @param {bool} anticlockwise Whether it is clockwise or not
     * @param {string} color Color name of circle
     * @param {number} lineWidth Line of circle width
     */
    strokeCircle(x, y, radius, startAngle, endAngle, anticlockwise, color, lineWidth) {}

    /**
     * Rendering square outline
     * @interface
     * @param {number} x Upper left x position
     * @param {number} y Upper left y position
     * @param {number} width Width of the rectangle
     * @param {number} height Height of the rectangle
     * @param {string} color Color name of rectangle
     * @param {number} lineWidth Line of rectangle width
     */
    strokeRect(x, y, width, height, color, lineWidth) {}

    /**
     * Rendering image
     * @interface
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
    drawImage(imageID, x, y, width, height, srcX, srcY, srcW, srcH) {}
}
