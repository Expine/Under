/**
 * Stage
 * Performs updating and rendering stage
 * Manages stage element such as entity
 * Should allow entities to be retrieved with iterators
 * @classdesc Stage to control stage element
 */
class Stage { // eslint-disable-line  no-unused-vars
    /**
     * Stage Constructor
     * Set iteratable
     * @constructor
     */
    constructor() {
        // set iterator
        this[Symbol.iterator] = function() {
            return this;
        };
    }

    /**
     * Set map manager
     * @param {Map} map map manager
     */
    setMap(map) {
        /**
         * Stage map element
         * @protected
         * @type {Map}
         */
        this.map = map;
    }

    /**
     * Set camera
     * @param {Camera} map camera
     */
    setCamera(camera) {
        /**
         * Stage camera element
         * @protected
         * @type {Camera}
         */
        this.camera = camera;
    }

    /**
     * Add entity to stage
     * @interface
     * @param {Entity} entity - entity object
     */
    addEntity(entity) {}

    /**
     * Get entity iterator
     * @interface
     * @return {Iterator} entity iterator
     */
    next() {}

    /**
     * Update stage
     * @interface
     * @param {number} dt delta time
     */
    update(dt) {}

    /**
     * Render stage
     * @interface
     * @param {Context} ctx - canvas context
     * @param {number} [shiftX = 0] shift x position
     * @param {number} [shiftY = 0] shift y position
     */
    render(ctx, shiftX = 0, shiftY = 0) {}
}
