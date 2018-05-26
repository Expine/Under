/**
 * Tile image
 * - Renders image
 * - Renders single image
 * - Renders partially
 * - Considers the direction
 * - ### Renders considering the direction
 * @extends {TileImage}
 * @implements {IDirectionalImage}
 * @classdesc Tile image to render considering the direction
 */
class DirectionalTileImage extends TileImage /* , IDirectionalImage */ { // eslint-disable-line  no-unused-vars
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
        super(imageID, width, height, srcX, srcY, srcW, srcH);

        /**
         * Image direction of X
         * @protected
         * @type {number}
         */
        this.directionX = 0;
        /**
         * Image direction of y
         * @protected
         * @type {number}
         */
        this.directionY = 0;
    }

    /**
     * Set direction of image
     * @override
     * @param {number} directionX Direction of x
     * @param {number} directionY Direction of y
     */
    setDirection(directionX, directionY) {
        this.directionX = directionX;
        this.directionY = directionY;
    }

    /**
     * Render image
     * @override
     * @param {Context} ctx Canvas context
     * @param {number} x Image x position
     * @param {number} y Image y position
     */
    render(ctx, x, y) {
        this.width *= this.directionX === 0 ? 1 : this.directionX;
        this.height *= this.directionY === 0 ? 1 : this.directionY * -1;
        super.render(ctx, x, y);
        this.width *= this.directionX === 0 ? 1 : this.directionX;
        this.height *= this.directionY === 0 ? 1 : this.directionY * -1;
    }
}
