/**
 * Tile image
 * - Renders image
 * - Renders single image
 * - ### Renders partially
 * @extends {SingleImage}
 * @classdesc Tile image to render partially
 */
class TileImage extends SingleImage {
    /**
     * Tile image constructor
     * @constructor
     * @param {number} imageID Image ID
     * @param {number} width Image width
     * @param {number} height Image height
     * @param {number} srcX X coordinate on the file
     * @param {number} srcY Y coordinate on the file
     * @param {number} srcW Width on file
     * @param {number} srcH Height on file
     */
    constructor(imageID, width, height, srcX, srcY, srcW, srcH) {
        super(imageID, width, height);

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
     * Get source offset x position
     * @override
     * @protected
     * @type {number}
     */
    getSourceOffsetX() {
        return this.srcX;
    }

    /**
     * Get source offset y position
     * @override
     * @protected
     * @type {number}
     */
    getSourceOffsetY() {
        return this.srcY;
    }

    /**
     * Get source width
     * @override
     * @protected
     * @type {number}
     */
    getSourceWidth() {
        return this.srcW;
    }
    /**
     * Get source height
     * @override
     * @protected
     * @type {number}
     */
    getSourceHeight() {
        return this.srcH;
    }

    /**
     * Render image
     * @override
     * @param {Context} ctx Canvas context
     * @param {number} x Image x position
     * @param {number} y Image y position
     */
    render(ctx, x, y) {
        ctx.drawImage(this.imageID, x, y, this.width, this.height, this.srcX, this.srcY, this.srcW, this.srcH);
    }
}
