/**
 * Map
 * Manage map element such as background
 * @classdesc Map class for managing map element
 */
class Map { // eslint-disable-line  no-unused-vars
    /**
     * Map constructor
     * @constructor
     * @param {number} width Map width per pixel
     * @param {number} height Map height per pixel
     */
    constructor(width, height) {
        /**
         * Map width
         * @type {number}
         */
        this.width = width;
        /**
         * Map height
         * @type {number}
         */
        this.height = height;
    }

    /**
     * Get back image ID
     * @interface
     * @return {number} Back image ID
     */
    getBackID() {}
    /**
     * Update map
     * @interface
     * @param {number} dt delta time
     */
    update(dt) {}

    /**
     * Render map
     * @interface
     * @param {Context} ctx - canvas context
     * @param {number} [shiftX = 0] shift x position
     * @param {number} [shiftY = 0] shift y position
     */
    render(ctx, shiftX = 0, shiftY = 0) {}
}
