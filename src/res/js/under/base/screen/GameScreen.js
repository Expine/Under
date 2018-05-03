/**
 * Screen
 * - ### Indicates the rendering target and input target
 * @interface
 * @classdesc Screen indicating the rendering and input target
 */
class GameScreen { // eslint-disable-line  no-unused-vars
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
        GameScreen.it = this;
    }

    /**
     * Initialize screen
     * @abstract
     */
    init() {}

    /**
     * Get input target element
     * @abstract
     * @return {Element} Element of input target
     */
    getTarget() {}

    /**
     * Get canvas for rendering
     * @abstract
     * @return {Canvas} Canvas
     */
    getCanvas() {}
}

/**
 * Instance for singleton
 * @static
 * @type {GameScreen}
 */
GameScreen.it = null;
