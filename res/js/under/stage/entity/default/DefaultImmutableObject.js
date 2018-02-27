/**
 * Default immutable object sample
 * @implements {ImmutableObject}
 * @classdesc Immutable object sample
 */
class DefaultImmutableObject extends ImmutableObject {
    /**
     * Entity constructor
     * @constructor
     * @param {number} verticalId tile vertical id
     * @param {number} horizontalId tile horizontal id
     * @param {number} tileWidth tile width
     * @param {number} tileHeight tile height
     * @param {number} x x position
     * @param {number} y y position
     * @param {number} width object width
     * @param {number} height object height
     * @param {Image} image tile image
     * @param {Collider} collider collider (if has not, undefined)
     */
    constructor(verticalId, horizontalId, tileWidth, tileHeight, x, y, width, height, image, collider) {
        super(x, y, width, height, image, collider);
        /**
         * Object vertical id for rendering tile
         * @protected
         * @type {number}
         */
        this.verticalId = verticalId;
        /**
         * Object horizontal id for rendering tile
         * @protected
         * @type {number}
         */
        this.horizontalId = horizontalId;
        /**
         * Tile width
         * @protected
         * @type {number}
         */
        this.tileWidth = tileWidth;
        /**
         * Tile height
         * @protected
         * @type {number}
         */
        this.tileHeight = tileHeight;
    }

    /**
     * Render entity
     * @override
     * @param {CanvasRenderingContext2D} ctx - canvas context
     * @param {number} [shiftX = 0] shift x position
     * @param {number} [shiftY = 0] shift y position
     */
    render(ctx, shiftX = 0, shiftY = 0) {
        ctx.drawImage(this.image, this.horizontalId * this.tileHeight, this.verticalId * this.tileWidth, this.tileWidth, this.tileHeight, this.x + shiftX, this.y + shiftY, this.width, this.height);

        // for debug
        if (this.collider !== undefined)
            this.collider.render(ctx, shiftX, shiftY);
    }
}