/**
 * Axis Aligned Bounding Box
 * @classdesc Axis Aligned Bounding Box for collision detection
 */
class AABB { // eslint-disable-line  no-unused-vars
    /**
     * AABB Constructor
     * @constructor
     */
    constructor() {
        /**
         * X coordinate of the upper left
         * @type {number}
         */
        this.startX = 0;
        /**
         * Y coordinate of the upper left
         * @type {number}
         */
        this.startY = 0;
        /**
         * X coordinate of the lower right
         * @type {number}
         */
        this.endX = 0;
        /**
         * Y coordinate of the lower right
         * @type {number}
         */
        this.endY = 0;
    }
}
