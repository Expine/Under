import { GameImage } from './../../../base/resources/image/GameImage';
import { ResourceID } from '../../../base/resources/IResourceManager';
import { ResourceManager } from '../../../base/resources/ResourceManager';
import { Context } from '../../../base/resources/image/Context';
/**
 * Single image
 * - Renders single image
 * @extends {GameImage}
 * @classdesc Single image to render single image
 */
export class SingleImage extends GameImage {
    /**
     * Image ID
     * @protected
     * @type {ResourceID}
     */
    protected imageID: ResourceID;

    /**
     * Image width
     * @protected
     * @type {number?}
     */
    protected width?: number;
    /**
     * Image height
     * @protected
     * @type {number}
     */
    protected height?: number;

    /**
     * Single image constructor
     * @constructor
     * @param {ResourceID} imageID Image ID
     * @param {number} width Image width
     * @param {number} height Image height
     */
    constructor(imageID: ResourceID, width?: number, height?: number) {
        super();
        this.imageID = imageID;
        this.width = width;
        this.height = height;
    }

    /**
     * Set image size
     * @override
     * @param {number} width Image width
     * @param {number} height Image height
     */
    setSize(width: number, height: number) {
        this.width = width;
        this.height = height;
    }

    /**
     * Set image ID
     * @override
     * @param {ResourceID} imageID Image ID
     */
    setImageID(imageID: ResourceID) {
        this.imageID = imageID;
    }

    /**
     * Get image ID
     * @abstract
     * @return {ResourceID} Image ID
     */
    getImageID(): ResourceID {
        return this.imageID;
    }

    /**
     * Get image width
     * @override
     * @return {number} Imag width
     */
    getWidth(): number {
        return this.width === undefined ? 0 : this.width;
    }

    /**
     * Get image height
     * @override
     * @return {number} Imag height
     */
    getHeight(): number {
        return this.height === undefined ? 0 : this.height;
    }

    /**
     * Get source offset x position
     * @override
     * @return {number}
     */
    getSourceOffsetX() {
        return 0;
    }

    /**
     * Get source offset y position
     * @override
     * @return {number}
     */
    getSourceOffsetY() {
        return 0;
    }

    /**
     * Get source width
     * @override
     * @return {number}
     */
    getSourceWidth() {
        return ResourceManager.image.getWidth(this.imageID);
    }
    /**
     * Get source height
     * @override
     * @return {number}
     */
    getSourceHeight() {
        return ResourceManager.image.getHeight(this.imageID);
    }

    /**
     * Initialize image
     * @override
     */
    init() {

    }

    /**
     * Update image
     * @override
     * @param {number} dt Delta time
     */
    update(_dt: number) {
        if (this.width === null) {
            const width = this.getSourceWidth();
            if (width > 0) {
                this.width = width;
            }
        }
        if (this.height === null) {
            const height = this.getSourceHeight();
            if (height > 0) {
                this.height = height;
            }
        }
    }

    /**
     * Render image
     * @override
     * @param {Context} ctx Canvas context
     * @param {number} x Image x position
     * @param {number} y Image y position
     */
    render(ctx: Context, x: number, y: number) {
        ctx.drawImage(this.imageID, x, y, this.width, this.height);
    }
}
