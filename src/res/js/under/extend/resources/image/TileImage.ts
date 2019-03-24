import { SingleImage } from "./SingleImage";
import { Context } from "../../../base/resources/image/Context";
import { ResourceID } from "../../../base/resources/IResourceManager";

/**
 * Tile image
 * - Renders partially
 * @extends {SingleImage}
 * @classdesc Tile image to render partially
 */
export class TileImage extends SingleImage {
    /**
     * X coordinate on the file
     * @protected
     * @type {number}
     */
    protected srcX: number;
    /**
     * Y coordinate on the file
     * @protected
     * @type {number}
     */
    protected srcY: number;
    /**
     * Width on file
     * @protected
     * @type {number}
     */
    protected srcW: number;
    /**
     * Height on file
     * @protected
     * @type {number}
     */
    protected srcH: number;

    /**
     * Tile image constructor
     * @constructor
     * @param {ResourceID} imageID Image ID
     * @param {number} width Image width
     * @param {number} height Image height
     * @param {number} srcX X coordinate on the file
     * @param {number} srcY Y coordinate on the file
     * @param {number} srcW Width on file
     * @param {number} srcH Height on file
     */
    constructor(imageID: ResourceID, width: number, height: number, srcX: number, srcY: number, srcW: number, srcH: number) {
        super(imageID, width, height);

        this.srcX = srcX;
        this.srcY = srcY;
        this.srcW = srcW;
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
    render(ctx: Context, x: number, y: number) {
        ctx.drawImage(this.imageID, x, y, this.width, this.height, this.srcX, this.srcY, this.srcW, this.srcH);
    }
}
