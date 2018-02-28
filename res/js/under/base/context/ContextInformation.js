/**
 * Context information
 * Controls default values ​​when drawing
 * @classdesc Context information to conrtol default value
 */
class ContextInformation {
    /**
     * Set the color of text
     * @interface
     * @param {string} colorName Color name
     */
    setFontColor(colorName) {}

    /**
     * Set the color of text
     * @interface
     * @param {number} r Red component   (0 <= r <= 255)
     * @param {number} g Green component (0 <= g <= 255)
     * @param {number} b Blue component  (0 <= b <= 255)
     */
    setFontColor(r, g, b) {}

    /**
     * Get the color of text
     */
    getFontColor() {}

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
}