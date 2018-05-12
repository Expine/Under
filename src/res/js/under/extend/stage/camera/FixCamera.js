/**
 * Fix camera
 * - Calculates the area to rendering
 * - ### Fixes certain position
 * @extends {Camera}
 * @classdesc Fix camera to fix certain position
 */
class FixCamera extends Camera { // eslint-disable-line  no-unused-vars
    /**
     * Fix camera constructor
     * @constructor
     * @param {number} x Fixed x position
     * @param {number} y Fixed y position
     */
    constructor(x, y) {
        super();

        /**
         * Fixed x position
         * @protected
         * @type {number}
         */
        this.fixX = x;
        /**
         * Fixed y position
         * @protected
         * @type {number}
         */
        this.fixY = y;
    }
    /**
     * Set camera position
     * @param {number} x Base x position
     * @param {number} y Base y position
     * @param {number} width Camera max width
     * @param {number} height Camera max height
     */
    setCameraPosition(x, y, width, height) {
        this.cameraY = -this.fixX;
        this.cameraY = -this.fixY;
    }
}
