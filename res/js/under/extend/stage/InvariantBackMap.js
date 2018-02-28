/**
 * Default map sample
 * @implements {Map}
 * @classdesc Map sample
 */
class InvariantBackMap extends Map {
    /**
     * Invariant back map constructor
     * @constructor
     * @param {number} backID background image id
     * @param {number} width Map width per pixel
     * @param {number} height Map height per pixel
     */
    constructor(backID, width, height) {
        super(width, height);
        /**
         * Background image id
         * @private
         * @type {number}
         */
        this.backID_ = backID;
    }

    /**
     * Render map
     * @override
     * @param {Context} ctx - canvas context
     * @param {number} [shiftX = 0] shift x position
     * @param {number} [shiftY = 0] shift y position
     */
    render(ctx, shiftX = 0, shiftY = 0) {
        ctx.drawImage(this.backID_, 0, 0, this.width, this.height);
    }
}