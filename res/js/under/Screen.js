/**
 * Screen manager
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
     * Set canvas
     * @interface
     * @param {Canvas} canvas target canvas
     */
    setCanvas() {}
}