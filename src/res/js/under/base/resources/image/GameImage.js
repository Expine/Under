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
