/**
 * Axis Aligned Bounding Box
 * - ### Uses for rough collision determination
 * @interface
 * @classdesc Axis Aligned Bounding Box to use for rough collision determination
 */
class AABB { // eslint-disable-line  no-unused-vars
    /**
     * Get start x position
     * @abstract
     * @return {number} Start x position
     */
    get startX() {}

    /**
     * Get start y position
     * @abstract
     * @return {number} Start y position
     */
    get startY() {}

    /**
     * Get end x position
     * @abstract
     * @return {number} End x position
     */
    get endX() {}

    /**
     * Get end y position
     * @abstract
     * @return {number} End y position
     */
    get endY() {}

    /**
     * Update AABB
     * @abstract
     * @param {number} startX Relative x coordinate of the upper left
     * @param {number} startY Relative y coordinate of the upper left
     * @param {number} endX Relative x coordinate of the lower right
     * @param {number} endY Relative y coordinate of the lower right
     * @param {InfluentialEntity} entity Entity attaced it
     */
    update(startX, startY, endX, endY, entity) {}
}
