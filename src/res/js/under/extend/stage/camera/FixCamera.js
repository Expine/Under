/**
 * Fix camera
 * - Calculates the area to rendering
 * - ### Fixes certain position
 * @extends {Camera}
 * @classdesc Fix camera to fix certain position
 */
class FixCamera extends Camera {
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
     * Initialize camera
     * @override
     * @param {number} x First camera x position
     * @param {number} y First camera y position
     */
    init(x, y) {
        this.update(x, y, 0);
    }

    /**
     * Update camera
     * @override
     * @param {number} x Base x position
     * @param {number} y Base y position
     * @param {number} dt Delta time
     */
    update(x, y, dt) {
        this.cameraY = -this.fixX;
        this.cameraY = -this.fixY;
    }
}
