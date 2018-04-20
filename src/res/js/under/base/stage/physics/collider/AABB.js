/**
 * Axis Aligned Bounding Box
 * - ### Uses for rough collision determination
 * @classdesc Axis Aligned Bounding Box to use for rough collision determination
 */
class AABB { // eslint-disable-line  no-unused-vars
    /**
     * Get start x position
     * @interface
     * @return {number} Start x position
     */
    get startX() {}

    /**
     * Get start y position
     * @interface
     * @return {number} Start y position
     */
    get startY() {}

    /**
     * Get end x position
     * @interface
     * @return {number} End x position
     */
    get endX() {}

    /**
     * Get end y position
     * @interface
     * @return {number} End y position
     */
    get endY() {}

    /**
     * Update AABB
     * @interface
     * @param {number} startX Relative x coordinate of the upper left
     * @param {number} startY Relative y coordinate of the upper left
     * @param {number} endX Relative x coordinate of the lower right
     * @param {number} endY Relative y coordinate of the lower right
     * @param {InfluentialEntity} entity Entity attaced it
     */
    update(startX, startY, endX, endY, entity) {}
}
