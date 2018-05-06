/**
 * Single image
 * - Renders image
 * - ### Renders single image
 * @extends {GameImage}
 * @classdesc Single image to render single image
 */
class SingleImage extends GameImage { // eslint-disable-line  no-unused-vars
    /**
     * SIngle image constructor
     * @constructor
     * @param {number} imageID Image ID
     * @param {number} [width = undefined] Image width
     * @param {number} [height = undefined] Image height
     */
    constructor(imageID, width, height) {
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
