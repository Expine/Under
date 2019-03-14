import { ResourceID } from "../IResourceManager";
import { Context } from "./Context";

/**
 * Game image
 * - Renders image
 * @interface
 * @classdesc Game image to render image
 */
export interface GameImage {
    /**
     * Set image size
     * @abstract
     * @param {number} width Image width
     * @param {number} height Image height
     */
    setSize(width: number, height: number): void;

    /**
     * Set image ID
     * @abstract
     * @param {ResourceID} imageID Image ID
     */
    setImageID(imageID: ResourceID): void;

    /**
     * Get image ID
     * @abstract
     * @return {ResourceID} Image ID
     */
    getImageID(): ResourceID;

    /**
     * Get image width
     * @abstract
     * @return {number} Imag width
     */
    getWidth(): number;

    /**
     * Get image height
     * @abstract
     * @return {number} Imag height
     */
    getHeight(): number;

    /**
     * Get source offset x position
     * @abstract
     * @protected
     * @type {number}
     */
    getSourceOffsetX(): void;

    /**
     * Get source offset y position
     * @abstract
     * @protected
     * @type {number}
     */
    getSourceOffsetY(): void;

    /**
     * Get source width
     * @abstract
     * @protected
     * @type {number}
     */
    getSourceWidth(): void;

    /**
     * Get source height
     * @abstract
     * @protected
     * @type {number}
     */
    getSourceHeight(): void;

    /**
     * Initialize image
     * @abstract
     */
    init(): void;

    /**
     * Update image
     * @abstract
     * @param {number} dt
     */
    update(dt: number): void;

    /**
     * Render image
     * @abstract
     * @param {Context} ctx Canvas context
     * @param {number} x Image x position
     * @param {number} y Image y position
     */
    render(ctx: Context, x: number, y: number): void;
}
