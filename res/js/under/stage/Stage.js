/**
 * Stage base class
 * @classdesc Stage base class
 */
class Stage {
    constructor() {
        this.immutables = new Array();
        this.mutables = new Array();
        this.characters = new Array();
    }

    /**
     * Add entity to stage
     * @param {Entity} entity - entity object
     */
    addEntity(entity) {
        if (entity instanceof ImmutableObject)
            this.immutables.push(entity);
        else if (entity instanceof MutableObject)
            this.mutables.push(entity);
        else if (entity instanceof Character)
            this.characters.push(entity);
    }

    /**
     * Render stage
     * @param {CanvasRenderingContext2D} ctx - canvas context
     */
    render(ctx) {
        // render entity
        for (let array of [this.immutables, this.mutables, this.characters])
            for (let it of array)
                it.render(ctx);
    }
}