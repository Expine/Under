/**
 * Stage
 * Performs updating and rendering stage
 * Manages stage element such as entity
 * @classdesc Stage to control stage element
 */
class Stage { // eslint-disable-line  no-unused-vars
    /**
     * Stage constructor
     * @constructor
     */
    constructor() {
        /**
         * Stage x position
         * @protected
         * @type {number}
         */
        this.x = 0;
        /**
         * Stage y position
         * @protected
         * @type {number}
         */
        this.y = 0;

        /**
         * Whether to update the stage or not
         * @protected
         * @type {bool}
         */
        this.enable = true;
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
     * Set physical world
     * @param {PhysicalWorld} physic Physical world
     */
    setPhysicalWorld(physic) {
        /**
         * Physical world
         * @protected
         * @type {PhysicalWorld}
         */
        this.physic = physic;
    }

    /**
     * Get physical world
     * @return {PhysicalWorld} Physical world
     */
    getPhysicalWorld() {
        return this.physic;
    }


    /**
     * Set stage position
     * @param {number} x Stage x posiiton
     * @param {number} y Stage y position
     */
    setPosition(x, y) {
        this.x = x;
        this.y = y;
    }

    /**
     * Control stage update
     * @param {bool} enable Whether to update the stage or not
     */
    setEnable(enable) {
        this.enable = enable;
    }

    /**
     * Add entity to stage
     * @interface
     * @param {Entity} entity - entity object
     */
    addEntity(entity) {}

    /**
     * Remove entity from stage
     * @interface
     * @param {Entity} entity - entity object
     */
    removeEntity(entity) {}

    /**
     * Get all entities
     * @interface
     * @return {Array<Entity>} All entities
     */
    getEntities() {}

    /**
     * Update stage
     * @interfane
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
