/**
 * Sequential map
 * - Renders and update backgrdoun image
 * - ### Processes continuously
 * @implements {Map}
 * @classdesc Sequential map to process continuously
 */
class SequentialMap extends Map { // eslint-disable-line  no-unused-vars
    /**
     * Sequential map constructor
     * @constructor
     */
    constructor() {
        super();

        /**
         * List of maps to process consecutively
         * @protected
         * @type {Array<Map>}
         */
        this.maps = [];
    }

    /**
     * Add map to list
     * @param {Map} map Map
     */
    addMap(map) {
        this.maps.push(map);
    }

    /**
     * Get back image ID
     * @return {number} Back image ID
     */
    getBackID() {
        return this.maps.length > 0 ? this.maps[this.maps.length - 1] : -1;
    }

    /**
     * Render map
     * @override
     * @param {Context} ctx Canvas context
     * @param {number} [shiftX = 0] Shift x position
     * @param {number} [shiftY = 0] Shift y position
     */
    render(ctx, shiftX = 0, shiftY = 0) {
        for (let map of this.maps) {
            map.render(ctx, shiftX, shiftY);
        }
    }
}
