/**
 * Screen manager
 * Indicates the rendering target
 * @classdesc Screen class for managing screen information
 */
class Screen { // eslint-disable-line  no-unused-vars
    /**
     * Screen constructor
     * @constructor
     * @param {number} width  screen width
     * @param {number} height  screen height
     */
    constructor(width, height) {
        /**
         * Game screen ratio
         * @type {number}
         */
        this.gameSize = 1;
        /**
         * Game screen width size
         * @type {number}
         */
        this.width = width;
        /**
         * Game screen height size
         * @type {number}
         */
        this.height = height;
    }

    /**
     * Get input target element
     * @return {Element} Element of input target
     */
    getTarget() {}

    /**
     * Get canvas for rendering
     * @return {Canvas} Canvas
     */
    getCanvas() {}
}
