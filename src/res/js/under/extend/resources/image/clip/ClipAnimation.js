/**
 * Clip animation
 * - Renders image
 * - Manages animation
 * - Considers the direction
 * - Clips area when rendering
 * - Delegates other animation
 * - ### Renders by cliping
 * @extends {DelegateAnimation}
 * @classdesc Clip animation to render by cliping
 */
class ClipAnimation extends DelegateAnimation { // eslint-disable-line  no-unused-vars
    /**
     * Set clipingArea
     * @override
     * @param {number} clipX Cliping x position
     * @param {number} clipY Cliping y position
     * @param {number} clipWidth Cliping width
     * @param {number} clipWidth Cliping height
     */
    setClipArea(clipX, clipY, clipWidth, clipHeight) {
        for (const it of this.getImages()) {
            if (BaseUtil.implementsOf(it, IClipImage)) {
                it.setClipArea(clipX, clipY, clipWidth, clipHeight);
            }
        }
    }
}
