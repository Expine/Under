/**
 * Map
 * Manage map element such as background
 * @classdesc Map class for managing map element
 */
class Map {
    /**
     * Constructor for map
     * @constructor
     * @param {number} width Map width
     * @param {number} height Map height
     */
    constructor(width, height) {
        /**
         * Map width
         * @private
         * @type {number}
         */
        this.width_ = width;
        /**
         * Map height
         * @private
         * @type {number}
         */
        this.height_ = height;
    }
}