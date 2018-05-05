/**
 * Canvas screen
 * - Indicates the rendering target and input target
 * - ### Both input and rendering target is canvas
 * @interface
 * @extends {GameScreen}
 * @classdesc Canvas screen that both input and rendering target is canvas
 */
class CanvasScreen extends GameScreen { // eslint-disable-line  no-unused-vars
    /**
     * Canvas screen constructor
     * @constructor
     * @param {number} [width = 800] Screen width
     * @param {number} [height = 600] Screen height
     */
    constructor(width = 800, height = 600) {
        super(width, height);

        /**
         * Game canvas
         * @protected
         * @type {Canvas}
         */
        this.canvas = null;
    }

    /**
     * Get input target element
     * @override
     * @return {Element} Element of input target
     */
    getTarget() {
        return this.canvas;
    }

    /**
     * Get canvas for rendering
     * @override
     * @return {Canvas} Canvas
     */
    getCanvas() {
        return this.canvas;
    }
}
