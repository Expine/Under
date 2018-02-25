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
     * @param {number} dt delta time
     */
    update(dt) {
        // update entity
        for (let it of this)
            it.update(dt);
    }

    /**
     * Render stage
     * @param {CanvasRenderingContext2D} ctx - canvas context
     */
    render(ctx) {
        // render entity
        for (let it of this)
            it.render(ctx);
    }
}