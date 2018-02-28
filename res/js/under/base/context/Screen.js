/**
 * Screen manager
 * Indicates the rendering target
 * @classdesc Screen class for managing screen information
 */
class Screen {
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
     * @return {Element} input target element
     */
    getTarget() {}

    /**
     * Get canvas element
     * @return {Canvas} canvas element
     */
    getCanvas() {}

    /**
     * Canvas context for rendering
     * @return {Context} canvas context for rendering
     */
    getContext() {}
}