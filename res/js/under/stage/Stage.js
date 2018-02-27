/**
 * Stage
 * Manage stage element such as entity
 * @classdesc Stage base class
 */
class Stage {
    /**
     * Constructor for stage
     * Set iteratable
     * @constructor
     */
    constructor() {
        // set iterator
        this[Symbol.iterator] = function () {
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
     * Get X position of camera
     * @interface
     * @return {number} X position of camera
     */
    getCameraX() {}

    /**
     * Get Y position of camera
     * @interface
     * @return {number} Y position of camera
     */
    getCameraY() {}

    /**
     * Add entity to stage
     * @interface
     * @param {Entity} entity - entity object
     */
    addEntity(entity) {}

    /**
     * Get all objects that satisfy the function
     * @interface
     * @param {function(Entity) => boolean} judge judge function
     * @return {Array<Entity>} all objects that satisfy the function
     */
    getEntities(judge) {}

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
    update(dt) {
        for (let it of this)
            it.update(dt);
    }

    /**
     * Render stage
     * @interface
     * @param {CanvasRenderingContext2D} ctx - canvas context
     * @param {number} [shiftX = 0] shift x position
     * @param {number} [shiftY = 0] shift y position
     */
    render(ctx, shiftX = 0, shiftY = 0) {}
}