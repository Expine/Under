/**
 * Single clip image
 * - Renders image
 * - Clips area when rendering
 * - Renders single image
 * - Clips area when rendering
 * - ### Renders by cliping
 * @extends {SingleImage}
 * @implements {IClipImage}
 * @classdesc Single clip image to render by cliping
 */
class SingleClipImage extends SingleImage /* , IClipImage */ { // eslint-disable-line  no-unused-vars
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
        const width = ResourceManager.image.getWidth(this.imageID);
        const height = ResourceManager.image.getHeight(this.imageID);
        const widthPer = width / this.width;
        const heightPer = height / this.height;
        // set destination
        const dx = x < clipX ? clipX : x;
        const dy = y < clipY ? clipY : y;
        const dw = clipX + clipWidth < x + this.width ? clipX + clipWidth - dx : this.width - dx + x;
        const dh = clipY + clipHeight < y + this.height ? clipY + clipHeight - dy : this.height - dy + y;
        // set source
        const sx = x < clipX ? (clipX - x) * widthPer : 0;
        const sy = y < clipY ? (clipY - y) * heightPer : 0;
        const sw = clipX + clipWidth < x + this.width ? (clipX + clipWidth - dx) * widthPer : width - sx;
        const sh = clipY + clipHeight < y + this.height ? (clipY + clipHeight - dy) * heightPer : height - sy;
        if (sw > 0 && sh > 0) {
            ctx.drawImage(this.imageID, dx, dy, dw, dh, sx, sy, sw, sh);
        }
    }
}
