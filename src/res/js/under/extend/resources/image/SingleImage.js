/**
 * Single image
 * - Renders image
 * - ### Renders single image
 * @extends {GameImage}
 * @classdesc Single image to render single image
 */
class SingleImage extends GameImage { // eslint-disable-line  no-unused-vars
    /**
     * Single image constructor
     * @constructor
     * @param {number} imageID Image ID
     * @param {number} [width = null] Image width
     * @param {number} [height = null] Image height
     */
    constructor(imageID, width = null, height = null) {
        super();

        /**
         * Image ID
         * @protected
         * @type {number}
         */
        this.imageID = imageID;

        /**
         * Image width
         * @protected
         * @type {number}
         */
        this.width = width;
        /**
         * Image height
         * @protected
         * @type {number}
         */
        this.height = height;
    }

    /**
     * Set image size
     * @override
     * @param {number} width Image width
     * @param {number} height Image height
     */
    setSize(width, height) {
        this.width = width;
        this.height = height;
    }

    /**
     * Set image ID
     * @override
     * @param {number} imageID Image ID
     */
    setImageID(imageID) {
        this.imageID = imageID;
    }

    /**
     * Get image ID
     * @abstract
     * @return {number} Image ID
     */
    getImageID() {
        return this.imageID;
    }

    /**
     * Get image width
     * @override
     * @return {number} Imag width
     */
    getWidth() {
        return this.width;
    }

    /**
     * Get image height
     * @override
     * @return {number} Imag height
     */
    getHeight() {
        return this.height;
    }

    /**
     * Get source offset x position
     * @override
     * @protected
     * @type {number}
     */
    getSourceOffsetX() {
        return 0;
    }

    /**
     * Get source offset y position
     * @override
     * @protected
     * @type {number}
     */
    getSourceOffsetY() {
        return 0;
    }

    /**
     * Get source width
     * @override
     * @protected
     * @type {number}
     */
    getSourceWidth() {
        return ResourceManager.image.getWidth(this.imageID);
    }
    /**
     * Get source height
     * @override
     * @protected
     * @type {number}
     */
    getSourceHeight() {
        return ResourceManager.image.getHeight(this.imageID);
    }

    /**
     * Update image
     * @override
     * @param {number} dt Delta time
     */
    update(dt) {
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
    render(ctx, x, y) {
        ctx.drawImage(this.imageID, x, y, this.width, this.height);
    }
}
