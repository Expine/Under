/**
 * Tile object
 * - Object present on the stage that has coordinate and size
 * - Has image ID
 * - It can be collided because it has material and collider
 * - It is fixed and no change will occur
 * - ### Decides the tile to be displayed by the ID and position, using the sprite indicating the stage tiles
 * @implements {ImmutableEntity}
 * @classdesc Tile object to decide the tile to be displayed by the IDand position, using the sprite indecating the stage tiles
 */
class TileObject extends ImmutableEntity { // eslint-disable-line  no-unused-vars
    /**
     * Tile object constructor
     * @constructor
     * @param {number} srcX X coordinate on the file
     * @param {number} srcY Y coordinate on the file
     * @param {number} srcW Width on file
     * @param {number} srcH Height on file
     * @param {number} x X position
     * @param {number} y Y position
     * @param {number} width Tile width
     * @param {number} height Tile height
     * @param {number} imageID Tile image id
     */
    constructor(srcX, srcY, srcW, srcH, x, y, width, height, imageID) {
        super(x, y, width, height, imageID);
        /**
         * X coordinate on the file
         * @protected
         * @type {number}
         */
        this.srcX = srcX;
        /**
         * Y coordinate on the file
         * @protected
         * @type {number}
         */
        this.srcY = srcY;
        /**
         * Width on file
         * @protected
         * @type {number}
         */
        this.srcW = srcW;
        /**
         * Height on file
         * @protected
         * @type {number}
         */
        this.srcH = srcH;
    }

    /**
     * Render entity
     * @override
     * @param {Context} ctx Canvas context
     * @param {number} [shiftX = 0] Shift x position
     * @param {number} [shiftY = 0] Shift y position
     */
    render(ctx, shiftX = 0, shiftY = 0) {
        ctx.drawImage(this.imageID, this.x + shiftX, this.y + shiftY, this.width, this.height, this.srcX, this.srcY, this.srcW, this.srcH);
    }
}
