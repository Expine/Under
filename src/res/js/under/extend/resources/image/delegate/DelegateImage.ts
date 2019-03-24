import { GameImage } from "../../../../base/resources/image/GameImage";
import { IDirectionalImage, isIDirectionalImage } from "../../../../base/resources/image/IDirectionalImage";
import { IClipImage, isIClipImage } from "../../../../base/resources/image/IClipImage";
import { ResourceID } from "../../../../base/resources/IResourceManager";
import { Context } from "../../../../base/resources/image/Context";

/**
 * Delegate image
 * - Delegates other image
 * @extends {GameImage}
 * @implements {IDirectionalImage}
 * @implements {IClipImage}
 * @classdesc Delegate image to delegate other image
 */
export class DelegateImage extends GameImage implements IDirectionalImage, IClipImage {
    /**
     * Base image for delegation
     * @protected
     * @type {GameImage}
     */
    protected baseImage: GameImage;

    /**
     * Delegate image constructor
     * @constructor
     * @param {GameImage} baseImage Base image for delegation
     */
    constructor(baseImage: GameImage) {
        super();

        this.baseImage = baseImage;
    }

    /**
     * Set direction of image
     * @override
     * @param {number} directionX Direction of x
     * @param {number} directionY Direction of y
     */
    setDirection(directionX: number, directionY: number) {
        if (isIDirectionalImage(this.baseImage)) {
            this.baseImage.setDirection(directionX, directionY);
        }
    }

    /**
     * Set clipingArea
     * @override
     * @param {number} clipX Cliping x position
     * @param {number} clipY Cliping y position
     * @param {number} clipWidth Cliping width
     * @param {number} clipHeight Cliping height
     */
    setClipArea(clipX: number, clipY: number, clipWidth: number, clipHeight: number) {
        if (isIClipImage(this.baseImage)) {
            this.baseImage.setClipArea(clipX, clipY, clipWidth, clipHeight);
        }
    }

    /**
     * Set image size
     * @override
     * @param {number} width Image width
     * @param {number} height Image height
     */
    setSize(width: number, height: number) {
        this.baseImage.setSize(width, height);
    }

    /**
     * Set image ID
     * @override
     * @param {ResourceID} imageID Image ID
     */
    setImageID(imageID: ResourceID) {
        this.baseImage.setImageID(imageID);
    }

    /**
     * Get image ID
     * @override
     * @return {ResourceID} Image ID
     */
    getImageID(): ResourceID {
        return this.baseImage.getImageID();
    }

    /**
     * Get image width
     * @override
     * @return {number} Imag width
     */
    getWidth(): number {
        return this.baseImage.getWidth();
    }

    /**
     * Get image height
     * @override
     * @return {number} Imag height
     */
    getHeight(): number {
        return this.baseImage.getHeight();
    }

    /**
     * Get source offset x position
     * @override
     * @return {number}
     */
    getSourceOffsetX(): number {
        return this.baseImage.getSourceOffsetX();
    }

    /**
     * Get source offset y position
     * @override
     * @return {number}
     */
    getSourceOffsetY(): number {
        return this.baseImage.getSourceOffsetY();
    }

    /**
     * Get source width
     * @override
     * @return {number}
     */
    getSourceWidth(): number {
        return this.baseImage.getSourceWidth();
    }
    /**
     * Get source height
     * @override
     * @return {number}
     */
    getSourceHeight(): number {
        return this.baseImage.getSourceHeight();
    }

    /**
     * Initialize image
     * @override
     */
    init() {
        this.baseImage.init();
    }

    /**
     * Update image
     * @override
     * @param {number} dt
     */
    update(dt: number) {
        this.baseImage.update(dt);
    }

    /**
     * Render image
     * @override
     * @param {Context} ctx Canvas context
     * @param {number} x Image x position
     * @param {number} y Image y position
     */
    render(ctx: Context, x: number, y: number) {
        this.baseImage.render(ctx, x, y);
    }
}
