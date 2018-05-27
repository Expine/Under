/**
 * Game image
 * - ### Renders image
 * @interface
 * @classdesc Game image to render image
 */
class GameImage { // eslint-disable-line  no-unused-vars
    /**
     * Set image size
     * @abstract
     * @param {number} width Image width
     * @param {number} height Image height
     */
    setSize(width, height) {}

    /**
     * Set image ID
     * @abstract
     * @param {number} imageID Image ID
     */
    setImageID(imageID) {}

    /**
     * Get image ID
     * @abstract
     * @return {number} Image ID
     */
    getImageID() {}

    /**
     * Get image width
     * @abstract
     * @return {number} Imag width
     */
    getWidth() {}

    /**
     * Get image height
     * @abstract
     * @return {number} Imag height
     */
    getHeight() {}

    /**
     * Get source offset x position
     * @abstract
     * @protected
     * @type {number}
     */
    getSourceOffsetX() {}

    /**
     * Get source offset y position
     * @abstract
     * @protected
     * @type {number}
     */
    getSourceOffsetY() {}

    /**
     * Get source width
     * @abstract
     * @protected
     * @type {number}
     */
    getSourceWidth() {}

    /**
     * Get source height
     * @abstract
     * @protected
     * @type {number}
     */
    getSourceHeight() {}

    /**
     * Initialize image
     * @abstract
     */
    init() {}

    /**
     * Update image
     * @abstract
     * @param {number} dt
     */
    update(dt) {}

    /**
     * Render image
     * @abstract
     * @param {Context} ctx Canvas context
     * @param {number} x Image x position
     * @param {number} y Image y position
     */
    render(ctx, x, y) {}
}
