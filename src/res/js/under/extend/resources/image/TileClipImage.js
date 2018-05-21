/**
 * Tile image
 * - Renders image
 * - Renders single image
 * - Renders partially
 * - Clips area when rendering
 * - ### Renders by cliping
 * @extends {TileImage}
 * @implements {IClipImage}
 * @classdesc Tile image to render by cliping
 */
class TileClipImage extends TileImage /* , IClipImage */ { // eslint-disable-line  no-unused-vars
    /**
     * Render image
     * @abstract
     * @param {Context} ctx Canvas context
     * @param {number} x Image x position
     * @param {number} y Image y position
     */
    render(ctx, x, y) {
        ctx.drawImage(this.imageID, x, y, this.width, this.height, this.srcX, this.srcY, this.srcW, this.srcW);
    }

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
        const widthPer = this.srcW / this.width;
        const heightPer = this.srcH / this.height;
        // set destination
        const dx = x < clipX ? clipX : x;
        const dy = y < clipY ? clipY : y;
        const dw = clipX + clipWidth < x + this.width ? clipX + clipWidth - dx : this.width - dx + x;
        const dh = clipY + clipHeight < y + this.height ? clipY + clipHeight - dy : this.height - dy + y;
        // set source
        const sx = this.srcX + (x < clipX ? (clipX - x) * widthPer : 0);
        const sy = this.srcY + (y < clipY ? (clipY - y) * heightPer : 0);
        const sw = clipX + clipWidth < x + this.width ? (clipX + clipWidth - dx) * widthPer : this.srcW - sx + this.srcX;
        const sh = clipY + clipHeight < y + this.height ? (clipY + clipHeight - dy) * heightPer : this.srcH - sy + this.srcY;
        if (sw > 0 && sh > 0) {
            ctx.drawImage(this.imageID, dx, dy, dw, dh, sx, sy, sw, sh);
        }
    }
}
