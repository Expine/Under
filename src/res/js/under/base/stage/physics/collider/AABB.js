/**
 * Axis Aligned Bounding Box
 * @classdesc Axis Aligned Bounding Box for collision detection
 */
class AABB { // eslint-disable-line  no-unused-vars
    /**
     * AABB Constructor
     * @constructor
     * @param {number} [startX = 0] X coordinate of the upper left
     * @param {number} [startY = 0] Y coordinate of the upper left
     * @param {number} [endX = 0] X coordinate of the lower right
     * @param {number} [endY = 0] Y coordinate of the lower right
     */
    constructor(startX = 0, startY = 0, endX = 0, endY = 0) {
        /**
         * X coordinate of the upper left
         * @type {number}
         */
        this.startX = startX;
        /**
         * Y coordinate of the upper left
         * @type {number}
         */
        this.startY = startY;
        /**
         * X coordinate of the lower right
         * @type {number}
         */
        this.endX = endX;
        /**
         * Y coordinate of the lower right
         * @type {number}
         */
        this.endY = endY;
    }
}
