/**
 * Axis Aligned Bounding Box
 * - Uses for rough collision determination
 * - ### Decides from 4 vertices
 * @extends {AABB}
 * @classdesc Simple Axis Aligned Bounding Box to decide from 4 vertices
 */
class SimpleAABB extends AABB {
    /**
     * AABB Constructor
     * @constructor
     * @param {number} [startX = 0] X coordinate of the upper left
     * @param {number} [startY = 0] Y coordinate of the upper left
     * @param {number} [endX = 0] X coordinate of the lower right
     * @param {number} [endY = 0] Y coordinate of the lower right
     */
    constructor(startX = 0, startY = 0, endX = 0, endY = 0) {
        super();

        /**
         * X coordinate of the upper left
         * @type {number}
         */
        this.startXVal = startX;
        /**
         * Y coordinate of the upper left
         * @type {number}
         */
        this.startYVal = startY;
        /**
         * X coordinate of the lower right
         * @type {number}
         */
        this.endXVal = endX;
        /**
         * Y coordinate of the lower right
         * @type {number}
         */
        this.endYVal = endY;
    }

    /**
     * Get start x position
     * @override
     * @return {number} Start x position
     */
    get startX() {
        return this.startXVal;
    }

    /**
     * Get start y position
     * @override
     * @return {number} Start y position
     */
    get startY() {
        return this.startYVal;
    }

    /**
     * Get end x position
     * @override
     * @return {number} End x position
     */
    get endX() {
        return this.endXVal;
    }

    /**
     * Get end y position
     * @override
     * @return {number} End y position
     */
    get endY() {
        return this.endYVal;
    }

    /**
     * Update AABB
     * @override
     * @param {number} startX Relative x coordinate of the upper left
     * @param {number} startY Relative y coordinate of the upper left
     * @param {number} endX Relative x coordinate of the lower right
     * @param {number} endY Relative y coordinate of the lower right
     * @param {InfluentialEntity} entity Entity attaced it
     */
    update(startX, startY, endX, endY, entity) {
        this.startXVal = entity.x + startX;
        this.startYVal = entity.y + startY;
        this.endXVal = entity.x + endX;
        this.endYVal = entity.y + endY;
    }
}
