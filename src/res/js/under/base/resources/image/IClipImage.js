/**
 * Clip image interface
 * - ### Clips area when rendering
 * @interface
 * @classdesc Clip image interface to clip area when rendering
 */
class IClipImage extends Interface {
    /**
     * Set clipingArea
     * @abstract
     * @param {number} clipX Cliping x position
     * @param {number} clipY Cliping y position
     * @param {number} clipWidth Cliping width
     * @param {number} clipWidth Cliping height
     */
    setClipArea(clipX, clipY, clipWidth, clipHeight) {}
}
