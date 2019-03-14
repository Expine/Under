/**
 * Clip image
 * - Renders image
 * - Considers the direction
 * - Clips area when rendering
 * - Delegates other image
 * - ### Renders by cliping
 * @extends {DelegateImage}
 * @classdesc Clip image to render by cliping
 */
class ClipImage extends DelegateImage {
    /**
     * Clip image constructor
     * @constructor
     * @param {GameImage} baseImage Base image for delegation
     */
    constructor(baseImage) {
        super(baseImage);

        /**
         * Cliping x position
         * @protected
         * @type {number}
         */
        this.clipX = 0;
        /**
         * Cliping y position
         * @protected
         * @type {number}
         */
        this.clipY = 0;
        /**
         * Cliping width
         * @protected
         * @type {number}
         */
        this.clipWidth = Number.MAX_SAFE_INTEGER;
        /**
         * Cliping height
         * @protected
         * @type {number}
         */
        this.clipHeight = Number.MAX_SAFE_INTEGER;
    }

    /**
     * Set clipingArea
     * @override
     * @param {number} clipX Cliping x position
     * @param {number} clipY Cliping y position
     * @param {number} clipWidth Cliping width
     * @param {number} clipWidth Cliping height
     */
    setClipArea(clipX, clipY, clipWidth, clipHeight) {
        this.clipX = clipX;
        this.clipY = clipY;
        this.clipWidth = clipWidth;
        this.clipHeight = clipHeight;
    }

    /**
     * Render image
     * @override
     * @param {Context} ctx Canvas context
     * @param {number} x Image x position
     * @param {number} y Image y position
     */
    render(ctx, x, y) {
        const width = Math.abs(this.getWidth());
        const height = Math.abs(this.getHeight());
        const widthPer = this.getSourceWidth() / width;
        const heightPer = this.getSourceHeight() / height;
        // set destination
        const dx = x < this.clipX ? this.clipX : x;
        const dy = y < this.clipY ? this.clipY : y;
        const dw = this.clipX + this.clipWidth < x + width ? this.clipX + this.clipWidth - dx : width - dx + x;
        const dh = this.clipY + this.clipHeight < y + height ? this.clipY + this.clipHeight - dy : height - dy + y;
        // set source
        let sx = this.getSourceOffsetX() + (x < this.clipX ? (this.clipX - x) * widthPer : 0);
        const sy = this.getSourceOffsetY() + (y < this.clipY ? (this.clipY - y) * heightPer : 0);
        const sw = this.clipX + this.clipWidth < x + width ? (this.clipX + this.clipWidth - dx) * widthPer : this.getSourceWidth() - sx + this.getSourceOffsetX();
        const sh = this.clipY + this.clipHeight < y + height ? (this.clipY + this.clipHeight - dy) * heightPer : this.getSourceHeight() - sy + this.getSourceOffsetY();
        sx -= (this.getWidth() > 0 ? 0 : this.getSourceWidth() - sw);
        if (sw > 0 && sh > 0) {
            ctx.drawImage(this.getImageID(), dx, dy, dw * Math.sign(this.getWidth()), dh * Math.sign(this.getHeight()), sx, sy, sw, sh);
        }
    }
}
