/**
 * Map to process continuously
 * @implements {Map}
 * @classdesc Map to process continuously
 */
class SequentialMap extends Map { // eslint-disable-line  no-unused-vars
    /**
     * Sequential map constructor
     * @constructor
     * @param {number} width Map width per pixel
     * @param {number} height Map height per pixel
     */
    constructor(width, height) {
        super(width, height);

        /**
         * List of maps to process consecutively
         * @private
         * @type {Array<Map>}
         */
        this.maps_ = [];
    }

    /**
     * Add map to list
     * @param {Map} map Map
     */
    addMap(map) {
        this.maps_.push(map);
    }

    /**
     * Render map
     * @override
     * @param {Context} ctx - canvas context
     * @param {number} [shiftX = 0] shift x position
     * @param {number} [shiftY = 0] shift y position
     */
    render(ctx, shiftX = 0, shiftY = 0) {
        for (let map of this.maps_) {
            map.render(ctx, shiftX, shiftY);
        }
    }
}
