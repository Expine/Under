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
     * @param {RigidBody} body rigid body (if has not, undefined)
     */
    constructor(verticalId, horizontalId, tileWidth, tileHeight, x, y, width, height, image, body) {
        super(x, y, image, body);
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
        /**
         * Object width
         * @protected
         * @type {number}
         */
        this.width = width;
        /**
         * Object height
         * @protected
         * @type {number}
         */
        this.height = height;
    }

    /**
     * Render entity
     * @override
     * @param {CanvasRenderingContext2D} ctx - canvas context
     */
    render(ctx) {
        ctx.drawImage(this.image, this.verticalId * this.tileWidth, this.horizontalId * this.tileHeight, this.tileWidth, this.tileHeight, this.x, this.y, this.width, this.height);
    }
}