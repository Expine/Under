/**
 * Stage
 * Manage stage element such as entity
 * @classdesc Stage base class
 */
class Stage {
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
     * Update stage
     * @interface
     * @param {number} dt delta time
     */
    update(dt) {}

    /**
     * Render stage
     * @interface
     * @param {CanvasRenderingContext2D} ctx - canvas context
     * @param {number} [shiftX = 0] shift x position
     * @param {number} [shiftY = 0] shift y position
     */
    render(ctx, shiftX = 0, shiftY = 0) {}
}