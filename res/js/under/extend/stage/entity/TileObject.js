/**
 * Stage tile object
 * Indicates the tile of not moving on stage
 * Decides the tile to be displayed by the ID, using the sprite indicating the stage tiles
 * @implements {ImmutableObject}
 * @classdesc Stage tile object
 */
class TileObject extends ImmutableObject {
    /**
     * Tile object constructor
     * @constructor
     * @param {number} verticalId tile vertical id
     * @param {number} horizontalId tile horizontal id
     * @param {number} tileWidth tile width
     * @param {number} tileHeight tile height
     * @param {number} x x position
     * @param {number} y y position
     * @param {number} width object width
     * @param {number} height object height
     * @param {number} imageID tile image id
     * @param {Collider} collider collider (if has not, undefined)
     */
    constructor(verticalId, horizontalId, tileWidth, tileHeight, x, y, width, height, imageID, collider) {
        super(x, y, width, height, imageID, collider);
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
     * @param {Context} ctx - canvas context
     * @param {number} [shiftX = 0] shift x position
     * @param {number} [shiftY = 0] shift y position
     */
    render(ctx, shiftX = 0, shiftY = 0) {
        ctx.drawImage(this.imageID, this.horizontalId * this.tileHeight, this.verticalId * this.tileWidth, this.tileWidth, this.tileHeight, this.x + shiftX, this.y + shiftY, this.width, this.height);

        // for debug
        if (this.collider !== undefined)
            this.collider.render(ctx, shiftX, shiftY);
    }
}