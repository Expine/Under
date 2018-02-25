/**
 * Default stage sample
 * @implements {Stage}
 * @classdesc Stage sample
 */
class DefaultStage extends Stage {
    /**
     * Cnstructor for default stage
     * @constructor
     */
    constructor() {
        super();
        /**
         * Immutable entity list
         * @private
         * @type {Array}
         */
        this.immutables_ = new Array();
        /**
         * Mutable entity list
         * @private
         * @type {Array}
         */
        this.mutables_ = new Array();
        /**
         * Charactr list
         * @private
         * @type {Array}
         */
        this.characters_ = new Array();
    }

    /**
     * Add entity to stage
     * @override
     * @param {Entity} entity - entity object
     */
    addEntity(entity) {
        if (entity instanceof ImmutableObject)
            this.immutables_.push(entity);
        else if (entity instanceof MutableObject)
            this.mutables_.push(entity);
        else if (entity instanceof Character)
            this.characters_.push(entity);
    }

    /**
     * Update stage
     * @param {number} dt delta time
     */
    update(dt) {
        // update entity
        for (let it of this.immutables_)
            it.update(dt);
        for (let it of this.mutables_)
            it.update(dt);
        for (let it of this.characters_)
            it.update(dt);
    }

    /**
     * Render stage
     * @param {CanvasRenderingContext2D} ctx - canvas context
     */
    render(ctx) {
        // render entity
        for (let it of this.immutables_)
            it.render(ctx);
        for (let it of this.mutables_)
            it.render(ctx);
        for (let it of this.characters_)
            it.render(ctx);
    }
}