/**
 * Default map sample
 * @implements {Map}
 * @classdesc Map sample
 */
class InvariantBackMap extends Map {
    /**
     * Invariant back map constructor
     * @constructor
     * @param {Image} back background image
     * @param {number} width Map width per pixel
     * @param {number} height Map height per pixel
     */
    constructor(back, width, height) {
        super(width, height);
        /**
         * Background image
         * @private
         * @type {Image}
         */
        this.back_ = back;
    }

    /**
     * Render map
     * @override
     * @param {CanvasRenderingContext2D} ctx - canvas context
     * @param {number} [shiftX = 0] shift x position
     * @param {number} [shiftY = 0] shift y position
     */
    render(ctx, shiftX = 0, shiftY = 0) {
        ctx.drawImage(this.back_, 0, 0, this.width, this.height);
    }
}