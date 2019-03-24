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
     * @return {number}
     */
    abstract getSourceOffsetX(): number;

    /**
     * Get source offset y position
     * @abstract
     * @return {number}
     */
    abstract getSourceOffsetY(): number;

    /**
     * Get source width
     * @abstract
     * @return {number}
     */
    abstract getSourceWidth(): number;

    /**
     * Get source height
     * @abstract
     * @return {number}
     */
    abstract getSourceHeight(): number;

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
