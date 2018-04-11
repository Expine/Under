/**
 * Screen
 * - ### Indicates the rendering target and input target
 * @classdesc Screen indicating the rendering and input target
 */
class Screen { // eslint-disable-line  no-unused-vars
    /**
     * Screen constructor
     * @constructor
     * @param {number} width Screen width
     * @param {number} height Screen height
     */
    constructor(width, height) {
        /**
         * Game screen ratio
         * @type {number}
         */
        this.gameSize = 1;
        /**
         * Width of game screen size
         * @type {number}
         */
        this.width = width;
        /**
         * Height of game screen size
         * @type {number}
         */
        this.height = height;

        // set singleton
        Screen.it = this;
    }

    /**
     * Initialize screen
     * @interface
     */
    init() {}

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

/**
 * Instance for singleton
 * @static
 * @type {Screen}
 */
Screen.it = null;
