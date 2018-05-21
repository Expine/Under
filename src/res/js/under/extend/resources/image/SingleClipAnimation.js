/**
 * Single clip animation
 * - Renders image
 * - Manages animation
 * - Runs single animation
 * - Clips area when rendering
 * - ### Renders by cliping
 * @extends {SingleAnimation}
 * @implements {IClipImage}
 * @classdesc Single clip animation to render by cliping
 */
class SingleClipAnimation extends SingleAnimation /* , IClipImage */ { // eslint-disable-line  no-unused-vars
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
    clipingRender(ctx, x, y, clipX, clipY, clipWidth, clipHeight) {
        if (this.animation.length > 0) {
            const curImage = this.animation[this.runningAnimation];
            if (BaseUtil.implementsOf(curImage, IClipImage)) {
                curImage.clipingRender(ctx, x, y, clipX, clipY, clipWidth, clipHeight);
            }
        }
    }
}
