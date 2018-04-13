/**
 * Stage tile object
 * Indicates the tile of not moving on stage
 * Decides the tile to be displayed by the ID, using the sprite indicating the stage tiles
 * @implements {ImmutableEntity}
 * @classdesc Stage tile object to indicate the tile of not moving on stage
 */
class TileObject extends ImmutableEntity { // eslint-disable-line  no-unused-vars
    /**
     * Tile object constructor
     * @constructor
     * @param {number} srcX X coordinate on the file
     * @param {number} srcY Y coordinate on the file
     * @param {number} srcW Width on file
     * @param {number} srcH Height on file
     * @param {number} x x position
     * @param {number} y y position
     * @param {number} width tile width
     * @param {number} height tile height
     * @param {number} imageID tile image id
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

        // for debug
        if (Engine.debug && this.collider !== undefined) {
            this.collider.render(ctx, shiftX, shiftY);
        }
    }
}
