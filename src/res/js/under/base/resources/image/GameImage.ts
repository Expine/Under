import { ResourceID } from "../IResourceManager";
import { Context } from "./Context";

/**
 * Game image
 * - Renders image
 * @abstract
 * @classdesc Game image to render image
 */
export abstract class GameImage {
    /**
     * Set image size
     * @abstract
     * @param {number} width Image width
     * @param {number} height Image height
     */
    abstract setSize(width: number, height: number): void;

    /**
     * Set image ID
     * @abstract
     * @param {ResourceID} imageID Image ID
     */
    abstract setImageID(imageID: ResourceID): void;

    /**
     * Get image ID
     * @abstract
     * @return {ResourceID} Image ID
     */
    abstract getImageID(): ResourceID;

    /**
     * Get image width
     * @abstract
     * @return {number} Imag width
     */
    abstract getWidth(): number;

    /**
     * Get image height
     * @abstract
     * @return {number} Imag height
     */
    abstract getHeight(): number;

    /**
     * Get source offset x position
     * @abstract
     * @protected
     * @type {number}
     */
    protected abstract getSourceOffsetX(): void;

    /**
     * Get source offset y position
     * @abstract
     * @protected
     * @type {number}
     */
    protected abstract getSourceOffsetY(): void;

    /**
     * Get source width
     * @abstract
     * @protected
     * @type {number}
     */
    protected abstract getSourceWidth(): void;

    /**
     * Get source height
     * @abstract
     * @protected
     * @type {number}
     */
    protected abstract getSourceHeight(): void;

    /**
     * Initialize image
     * @abstract
     */
    abstract init(): void;

    /**
     * Update image
     * @abstract
     * @param {number} dt
     */
    abstract update(dt: number): void;

    /**
     * Render image
     * @abstract
     * @param {Context} ctx Canvas context
     * @param {number} x Image x position
     * @param {number} y Image y position
     */
    abstract render(ctx: Context, x: number, y: number): void;
}
