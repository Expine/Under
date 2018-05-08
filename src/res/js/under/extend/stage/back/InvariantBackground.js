/**
 * Invariant background
 * - Renders and update backgrdoun image
 * - ### Background where the background does not move
 * @implements {Background}
 * @classdesc Invariant background where the background does not move
 */
class InvariantBackground extends Background { // eslint-disable-line  no-unused-vars
    /**
     * Invariant background constructor
     * @constructor
     * @param {number} backID Background image id
     */
    constructor(backID) {
        super();

        /**
         * Background image id
         * @protected
         * @type {number}
         */
        this.backID = backID;
    }

    /**
     * Render background
     * @override
     * @param {Context} ctx Canvas context
     * @param {number} shiftX Shift x position
     * @param {number} shiftY Shift y position
     * @param {number} screenWidth Scren width
     * @param {number} screenWidth Scren height
     */
    render(ctx, shiftX, shiftY, screenWidth, screenHeight) {
        ctx.drawImage(this.backID, 0, 0);
    }
}
