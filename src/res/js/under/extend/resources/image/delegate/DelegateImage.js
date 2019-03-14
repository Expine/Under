/**
 * Delegate image
 * - Renders image
 * - Considers the direction
 * - Clips area when rendering
 * - ### Delegates other image
 * @extends {GameImage}
 * @implements {IDirectionalImage}
 * @implements {IClipImage}
 * @classdesc Delegate image to delegate other image
 */
class DelegateImage extends GameImage /* , IDirectionalImage, IClipImage */ {
    /**
     * Delegate image constructor
     * @constructor
     * @param {GameImage} baseImage Base image for delegation
     */
    constructor(baseImage) {
        super();

        /**
         * Base image for delegation
         * @protected
         * @type {GameImage}
         */
        this.baseImage = baseImage;
    }

    /**
     * Set direction of image
     * @override
     * @param {number} directionX Direction of x
     * @param {number} directionY Direction of y
     */
    setDirection(directionX, directionY) {
        if (BaseUtil.implementsOf(this.baseImage, IDirectionalImage)) {
            this.baseImage.setDirection(directionX, directionY);
        }
    }

    /**
     * Set clipingArea
     * @override
     * @param {number} clipX Cliping x position
     * @param {number} clipY Cliping y position
     * @param {number} clipWidth Cliping width
     * @param {number} clipWidth Cliping height
     */
    setClipArea(clipX, clipY, clipWidth, clipHeight) {
        if (BaseUtil.implementsOf(this.baseImage, IClipImage)) {
            this.baseImage.setClipArea(clipX, clipY, clipWidth, clipHeight);
        }
    }

    /**
     * Set image size
     * @override
     * @param {number} width Image width
     * @param {number} height Image height
     */
    setSize(width, height) {
        this.baseImage.setSize(width, height);
    }

    /**
     * Set image ID
     * @override
     * @param {number} imageID Image ID
     */
    setImageID(imageID) {
        this.baseImage.setImageID(imageID);
    }

    /**
     * Get image ID
     * @override
     * @return {number} Image ID
     */
    getImageID() {
        return this.baseImage.getImageID();
    }

    /**
     * Get image width
     * @override
     * @return {number} Imag width
     */
    getWidth() {
        return this.baseImage.getWidth();
    }

    /**
     * Get image height
     * @override
     * @return {number} Imag height
     */
    getHeight() {
        return this.baseImage.getHeight();
    }

    /**
     * Get source offset x position
     * @override
     * @protected
     * @type {number}
     */
    getSourceOffsetX() {
        return this.baseImage.getSourceOffsetX();
    }

    /**
     * Get source offset y position
     * @override
     * @protected
     * @type {number}
     */
    getSourceOffsetY() {
        return this.baseImage.getSourceOffsetY();
    }

    /**
     * Get source width
     * @override
     * @protected
     * @type {number}
     */
    getSourceWidth() {
        return this.baseImage.getSourceWidth();
    }
    /**
     * Get source height
     * @override
     * @protected
     * @type {number}
     */
    getSourceHeight() {
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
    update(dt) {
        this.baseImage.update(dt);
    }

    /**
     * Render image
     * @override
     * @param {Context} ctx Canvas context
     * @param {number} x Image x position
     * @param {number} y Image y position
     */
    render(ctx, x, y) {
        this.baseImage.render(ctx, x, y);
    }
}
