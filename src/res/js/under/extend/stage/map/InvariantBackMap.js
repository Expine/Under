/**
 * Map where the background does not move
 * @implements {Map}
 * @classdesc Map where the background does not move
 */
class InvariantBackMap extends Map { // eslint-disable-line  no-unused-vars
    /**
     *
     * @param {number} backID background image id
     * @param {number} width
     * @param {number} height
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
        ctx.drawImage(this.backID_, shiftX, shiftY, this.width, this.height);
    }
}
