/**
 * Clip image interface
 * - ### Clips area when rendering
 * @interface
 * @classdesc Clip image interface to clip area when rendering
 */
class IClipImage extends Interface { // eslint-disable-line  no-unused-vars
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
     * Render image by cliping
     * @abstract
     * @param {Context} ctx Canvas context
     * @param {number} x Image x position
     * @param {number} y Image y position
     * @param {number} clipX Cliping x position
     * @param {number} clipY Cliping y position
     * @param {number} clipWidth Cliping width
     * @param {number} clipWidth Cliping height
     */
    clipingRender(ctx, x, y, clipX, clipY, clipWidth, clipHeight) {}
}
