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
    setCamera(camara) {
        /**
         * Stage camara element
         * @protected
         * @type {Camara}
         */
        this.camara = camara;
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
     */
    render(ctx) {}
}