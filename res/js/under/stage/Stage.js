/**
 * Stage
 * Manage stage element such as entity
 * @implements
 * @classdesc Stage base class
 */
class Stage {
    /**
     * Constructor for stage
     * Set iteratable
     * @constructor
     */
    constructor() {
        this[Symbol.iterator] = function () {
            return this;
        };
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
     * Render stage
     * @param {CanvasRenderingContext2D} ctx - canvas context
     */
    render(ctx) {
        // render entity
        for (let it of this)
            it.render(ctx);
    }
}